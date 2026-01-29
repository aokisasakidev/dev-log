# Privacy Policy for dev-log-core

## Overview

This document outlines the privacy considerations and data handling practices for the `dev-log-core` library. As a debugging utility, dev-log-core may process and output various types of data, and we want to ensure users understand the privacy implications.

## Data Collection and Processing

### What Data Does dev-log-core Handle?

`dev-log-core` is a logging utility that processes data provided by the applications that use it. The library itself does not collect, store, or transmit data independently. However, it may handle:

1. **Application Data**: Any data passed to debug functions by your application
2. **System Information**: Environment variables, timestamps, and system metadata
3. **Debug Messages**: Text and formatted output created by your application
4. **Performance Data**: Timing information and execution metrics

### Data Sources

- **Developer Input**: Debug messages and data explicitly logged by developers
- **Application State**: Object properties, variables, and function parameters
- **Environment**: System environment variables and configuration
- **Runtime Information**: Execution context and timing data

## Data Output and Storage

### Where Does Data Go?

Debug output is directed to various destinations based on configuration:

1. **Console Output**: Standard error (stderr) or standard output (stdout)
2. **Log Files**: When output is redirected to files
3. **Log Aggregation Systems**: When integrated with logging platforms
4. **Development Tools**: Browser developer consoles or IDE output

### Data Persistence

- `dev-log-core` does not persist data itself
- Data persistence depends on output destination configuration
- Browser environments may store debug state in localStorage
- Log files may be retained based on system configuration

## Privacy Considerations

### Sensitive Data Exposure

**Risk**: Debug output may inadvertently contain sensitive information such as:
- User credentials (passwords, API keys, tokens)
- Personal identifiable information (PII)
- Financial or health information
- Proprietary business data
- System security information

**Mitigation**: Developers should implement data sanitization and avoid logging sensitive information.

### Data Minimization

We recommend following data minimization principles:

1. **Log Only Necessary Information**: Include only data needed for debugging
2. **Sanitize Sensitive Data**: Remove or mask sensitive information before logging
3. **Use Appropriate Log Levels**: Implement different verbosity levels for different environments
4. **Regular Review**: Periodically review debug output for sensitive data exposure

## User Rights and Control

### For Application Developers

As a developer using `dev-log-core`, you have full control over:
- What data is logged through debug statements
- Where debug output is directed
- When debug logging is enabled or disabled
- How long debug logs are retained

### For End Users

End users of applications that use `dev-log-core` should be aware that:
- Debug logging may be enabled in development or testing environments
- Debug output should be disabled in production environments
- Applications should have their own privacy policies covering data handling

## Compliance Considerations

### GDPR (General Data Protection Regulation)

If your application processes EU personal data:
- Ensure debug logs containing personal data have appropriate legal basis
- Implement data minimization in debug logging
- Provide mechanisms to delete debug logs containing personal data
- Include debug logging in your data protection impact assessments

### CCPA (California Consumer Privacy Act)

For applications serving California residents:
- Include debug logging in privacy disclosures if personal information is logged
- Provide mechanisms for users to request deletion of debug logs
- Ensure debug logs are covered by your data handling procedures

### HIPAA (Health Insurance Portability and Accountability Act)

For healthcare applications:
- Never log protected health information (PHI) in debug output
- Implement strict access controls for any debug logs
- Ensure debug logging complies with minimum necessary standards

## Best Practices for Privacy Protection

### For Developers

1. **Sanitize Input**
   ```javascript
   const debug = require('dev-log-core')('app:auth');
   
   // ❌ Bad - Logs sensitive data
   debug('User login: %o', { username, password });
   
   // ✅ Good - Sanitized logging
   debug('User login attempt: %s', username.substring(0, 3) + '***');
   ```

2. **Environment-Based Controls**
   ```javascript
   // Disable debug in production
   if (process.env.NODE_ENV === 'production') {
     process.env.DEBUG = '';
   }
   ```

3. **Structured Logging**
   ```javascript
   // Use structured, sanitized logging
   debug('Operation completed', {
     operation: 'user_login',
     userId: hashUserId(userId),
     timestamp: Date.now(),
     success: true
   });
   ```

### For Organizations

1. **Policy Development**
   - Create debug logging policies and guidelines
   - Include debug practices in security training
   - Regular audits of debug output for sensitive data

2. **Technical Controls**
   - Implement automated scanning for sensitive patterns
   - Use log sanitization tools
   - Separate debug and production logging systems

3. **Access Controls**
   - Restrict access to debug logs
   - Implement log retention policies
   - Monitor debug log access

## Data Retention and Deletion

### Recommendations

1. **Short Retention Periods**: Keep debug logs only as long as necessary
2. **Automated Cleanup**: Implement automated log rotation and deletion
3. **Secure Deletion**: Use secure deletion methods for sensitive debug logs
4. **Documentation**: Maintain records of debug log retention policies

### Implementation

```javascript
// Example log rotation configuration
const debug = require('dev-log-core')('app');

// Implement custom log rotation
if (process.env.NODE_ENV !== 'production') {
  // Configure appropriate retention for development
  setupLogRotation({ maxAge: '7d', maxFiles: 10 });
}
```

## Contact Information

For privacy-related questions or concerns about `dev-log-core`:

- **General Questions**: Open an issue on GitHub
- **Security/Privacy Concerns**: Follow our [Security Policy](SECURITY.md)
- **Data Protection Inquiries**: Contact through official channels

## Updates to This Policy

This privacy policy may be updated to reflect:
- Changes in data handling practices
- New regulatory requirements
- Community feedback and best practices
- Security improvements

Users will be notified of significant changes through:
- GitHub releases and announcements
- Documentation updates
- Security advisories (if applicable)

---

*Last Updated: January 2026*
*Effective Date: January 2026*

**Note**: This privacy policy applies to the `dev-log-core` library itself. Applications using `dev-log-core` should have their own comprehensive privacy policies covering their specific data handling practices.