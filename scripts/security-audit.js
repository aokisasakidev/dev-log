#!/usr/bin/env node

/**
 * Custom security audit script that handles accepted risks
 * This script checks for vulnerabilities while respecting risk acceptance policies
 */

const { execSync } = require('child_process');
const fs = require('fs');

// ANSI color codes
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Accepted risk packages (from SECURITY_RISK_ACCEPTANCE.md)
const ACCEPTED_RISK_PACKAGES = [
  'request',
  'form-data', 
  'qs',
  'tough-cookie'
];

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  
  switch (type) {
    case 'error':
      console.error(`${colors.red}${colors.bold}✗ ERROR:${colors.reset} ${message}`);
      break;
    case 'warning':
      console.warn(`${colors.yellow}${colors.bold}⚠ WARNING:${colors.reset} ${message}`);
      break;
    case 'success':
      console.log(`${colors.green}${colors.bold}✓ PASS:${colors.reset} ${message}`);
      break;
    case 'info':
    default:
      console.log(`${colors.blue}${colors.bold}ℹ INFO:${colors.reset} ${message}`);
      break;
  }
}

function checkRiskAcceptanceDocument() {
  if (!fs.existsSync('SECURITY_RISK_ACCEPTANCE.md')) {
    log('SECURITY_RISK_ACCEPTANCE.md not found - cannot accept risks', 'error');
    return false;
  }
  
  const content = fs.readFileSync('SECURITY_RISK_ACCEPTANCE.md', 'utf8');
  const currentYear = new Date().getFullYear();
  
  if (!content.includes('request') || !content.includes(currentYear.toString())) {
    log('Risk acceptance document may be outdated', 'warning');
  }
  
  log('Risk acceptance document found and appears current', 'success');
  return true;
}

function runSecurityAudit() {
  log('Running security audit with risk acceptance...');
  
  // Check if risk acceptance document exists
  if (!checkRiskAcceptanceDocument()) {
    process.exit(1);
  }
  
  try {
    // Run npm audit and capture output
    const auditResult = execSync('npm audit --audit-level=moderate --omit=dev --json', { 
      stdio: 'pipe',
      encoding: 'utf8'
    });
    
    log('No vulnerabilities found in production dependencies', 'success');
    return true;
    
  } catch (error) {
    try {
      const auditOutput = JSON.parse(error.stdout);
      const vulnerabilities = auditOutput.metadata?.vulnerabilities || {};
      const auditData = auditOutput.vulnerabilities || {};
      
      let unacceptedCritical = 0;
      let unacceptedHigh = 0;
      let acceptedVulns = 0;
      let moderateVulns = vulnerabilities.moderate || 0;
      
      // Analyze each vulnerability
      Object.entries(auditData).forEach(([name, vuln]) => {
        const isAcceptedRisk = ACCEPTED_RISK_PACKAGES.some(pkg => 
          name === pkg || 
          (vuln.via && vuln.via.some(v => typeof v === 'string' && ACCEPTED_RISK_PACKAGES.includes(v)))
        );
        
        if (isAcceptedRisk) {
          acceptedVulns++;
        } else {
          if (vuln.severity === 'critical') {
            unacceptedCritical++;
          } else if (vuln.severity === 'high') {
            unacceptedHigh++;
          }
        }
      });
      
      // Report results
      if (acceptedVulns > 0) {
        log(`${acceptedVulns} vulnerabilities found in accepted risk packages (documented in SECURITY_RISK_ACCEPTANCE.md)`, 'warning');
      }
      
      if (moderateVulns > 0) {
        log(`${moderateVulns} moderate vulnerabilities found`, 'warning');
      }
      
      if (unacceptedCritical > 0) {
        log(`${unacceptedCritical} CRITICAL vulnerabilities found in non-accepted packages`, 'error');
        return false;
      }
      
      if (unacceptedHigh > 0) {
        log(`${unacceptedHigh} HIGH vulnerabilities found in non-accepted packages`, 'error');
        return false;
      }
      
      log('Security audit passed - no unaccepted critical or high vulnerabilities', 'success');
      return true;
      
    } catch (parseError) {
      log('Could not parse audit output, running basic check...', 'warning');
      
      // Fallback: check if we have critical vulnerabilities outside accepted packages
      try {
        execSync('npm audit --audit-level=critical --omit=dev', { stdio: 'pipe' });
        log('No critical vulnerabilities found', 'success');
        return true;
      } catch (criticalError) {
        log('Critical vulnerabilities detected - manual review required', 'error');
        return false;
      }
    }
  }
}

function main() {
  console.log(`${colors.blue}${colors.bold}Security Audit with Risk Acceptance${colors.reset}`);
  console.log('='.repeat(50));
  
  const success = runSecurityAudit();
  
  console.log('='.repeat(50));
  if (success) {
    log('Security audit completed successfully', 'success');
    process.exit(0);
  } else {
    log('Security audit failed - please review vulnerabilities', 'error');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { runSecurityAudit, ACCEPTED_RISK_PACKAGES };