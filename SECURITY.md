# Security Policy

## Supported Versions

We actively support the following versions of `debug-glitz` with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Security Features

`debug-glitz` includes several built-in security features:

- **No Remote Code Execution**: The library does not execute remote code or eval user input
- **Environment Variable Validation**: Debug namespaces are validated to prevent injection attacks
- **Safe Output Handling**: All output is properly escaped to prevent log injection
- **Minimal Dependencies**: Limited dependency tree reduces attack surface

## Reporting a Vulnerability

We take the security of `debug-glitz` seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please do NOT report security vulnerabilities through public GitHub issues.

Instead, please report them via one of the following methods:

1. **Email**: Please email security concerns to the maintainers at: security@[project-domain].com
2. **GitHub Security Advisory**: Use GitHub's [private vulnerability reporting](https://github.com/alphacointech1010/debug-glitz/security/advisories/new) feature

### What to include

When reporting a vulnerability, please include:

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

This information will help us triage your report more quickly.

## Response Timeline

- **Initial Response**: We will acknowledge receipt of your report within 48 hours
- **Status Update**: We will provide an initial status update within 7 days
- **Resolution**: We aim to resolve critical security vulnerabilities within 90 days, depending on complexity and severity

## Security Updates

Security updates will be released as soon as possible after a vulnerability is confirmed and a fix is prepared. Updates will be distributed through:

- npm package releases
- GitHub releases
- Security advisories published on GitHub

## Disclosure Policy

- Once a security vulnerability is confirmed and a fix is available, we will publish a security advisory
- We will credit the reporter (if desired) in our security advisories
- We follow responsible disclosure principles to give users time to update before public disclosure

## Best Practices

To help protect your application when using `debug-glitz`:

1. **Keep dependencies updated**: Regularly update `debug-glitz` to the latest version
2. **Review dependency changes**: Use tools like `npm audit` and `snyk` to monitor for known vulnerabilities
3. **Use environment variables carefully**: Be mindful of sensitive information in debug output
4. **Disable debug in production**: Ensure debug output is disabled in production environments to avoid leaking sensitive information

## Security Considerations

This library is designed for debugging purposes and outputs information to the console/logs. Please note:

- Debug output may contain sensitive information (e.g., request headers, user data)
- Always disable debug logging in production environments
- Be cautious when logging user input or sensitive data
- Review your debug namespaces to ensure no sensitive data is accidentally logged

## Acknowledgments

We appreciate the security research community's efforts to help keep `debug-glitz` and its users safe. Thank you for your responsible disclosure.
