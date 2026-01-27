
import React, { useEffect } from 'react';

export const PrivacyPolicy = () => {
  useEffect(() => {
    // Apply page-specific background
    document.body.style.backgroundColor = "#e0e7ff";

    // Cleanup when leaving the page
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-lg-10 offset-lg-1">
          <h1 className="mb-4 text-primary">Privacy Policy</h1>
          <p className="text-muted">Last Updated: January 2025</p>

          {/* Introduction */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">1. Introduction</h2>
            <p>
              Welcome to Bankify ("we," "us," "our," or "Company"). We are committed to protecting your privacy and ensuring you have a positive experience on our platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our e-banking services.
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">2. Information We Collect</h2>
            
            <h5 className="mt-4 mb-3">A. Personal Information</h5>
            <p>We may collect personal information that you voluntarily provide, including:</p>
            <ul>
              <li>Full name, email address, and phone number</li>
              <li>Account number and financial information</li>
              <li>Address and date of birth</li>
              <li>Government-issued identification information</li>
              <li>Social Security Number (SSN) or Tax ID</li>
              <li>Employment and income information</li>
              <li>Account login credentials and passwords</li>
            </ul>

            <h5 className="mt-4 mb-3">B. Automatic Collection</h5>
            <p>When you use our platform, we automatically collect:</p>
            <ul>
              <li>IP address and browser type</li>
              <li>Device information and operating system</li>
              <li>Pages visited and time spent on each page</li>
              <li>Cookies and tracking technologies</li>
              <li>Transaction history and activity logs</li>
              <li>Geolocation data</li>
            </ul>

            <h5 className="mt-4 mb-3">C. Information from Third Parties</h5>
            <p>We may receive information from:</p>
            <ul>
              <li>Credit bureaus and financial institutions</li>
              <li>Government agencies for verification purposes</li>
              <li>Third-party service providers</li>
              <li>Co-marketing partners</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">3. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li><strong>Account Management:</strong> To create, maintain, and manage your banking account</li>
              <li><strong>Transaction Processing:</strong> To process deposits, withdrawals, transfers, and loan applications</li>
              <li><strong>Authentication:</strong> To verify your identity and prevent fraud</li>
              <li><strong>Compliance:</strong> To comply with legal, regulatory, and contractual requirements</li>
              <li><strong>Communication:</strong> To send important notifications, updates, and customer service responses</li>
              <li><strong>Improvement:</strong> To improve our services, website functionality, and user experience</li>
              <li><strong>Marketing:</strong> To send promotional materials (only with your consent)</li>
              <li><strong>Security:</strong> To detect and prevent fraudulent activities and security breaches</li>
              <li><strong>Risk Assessment:</strong> To evaluate creditworthiness and loan eligibility</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">4. Data Security</h2>
            <p>
              We implement comprehensive security measures to protect your personal information, including:
            </p>
            <ul>
              <li>End-to-end encryption (SSL/TLS protocols)</li>
              <li>Firewalls and intrusion detection systems</li>
              <li>Multi-factor authentication</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Secure data centers with restricted access</li>
              <li>Compliance with banking security standards (PCI-DSS, ISO 27001)</li>
              <li>Employee security training and confidentiality agreements</li>
            </ul>
            <p>
              However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Information Sharing */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">5. Information Sharing and Disclosure</h2>
            <p>We may share your information in the following circumstances:</p>
            <ul>
              <li><strong>Service Providers:</strong> With third-party vendors who assist in operating our platform</li>
              <li><strong>Legal Compliance:</strong> When required by law, court orders, or government agencies</li>
              <li><strong>Fraud Prevention:</strong> To detect and prevent fraudulent activities</li>
              <li><strong>Business Transfers:</strong> In case of merger, acquisition, or bankruptcy</li>
              <li><strong>Consent:</strong> With your explicit written consent for other purposes</li>
            </ul>
            <p>
              We do not sell your personal information to third parties for marketing purposes without your consent.
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">6. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience. Cookies are small files stored on your device that help us remember your preferences and improve site functionality.
            </p>
            <p>Types of cookies we use:</p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for login and security</li>
              <li><strong>Performance Cookies:</strong> To analyze how you use our platform</li>
              <li><strong>Preference Cookies:</strong> To remember your settings and preferences</li>
            </ul>
            <p>
              You can control cookie settings through your browser, but disabling essential cookies may impair platform functionality.
            </p>
          </section>

          {/* User Rights */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">7. Your Privacy Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your data (subject to legal retention requirements)</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Portability:</strong> Request data in a portable format</li>
              <li><strong>Restriction:</strong> Limit how we use your information</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the information provided in the "Contact Us" section.
            </p>
          </section>

          {/* Data Retention */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">8. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Retention periods vary depending on the type of information and applicable regulations:
            </p>
            <ul>
              <li>Account information: Retained while account is active + 7 years</li>
              <li>Transaction records: Retained for 10 years (regulatory requirement)</li>
              <li>Marketing preferences: Retained until you opt-out</li>
              <li>Cookies: Typically deleted after browser session or up to 2 years</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">9. Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will delete such information and terminate the child's account.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">10. Third-Party Links</h2>
            <p>
              Our platform may contain links to third-party websites and services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any information.
            </p>
          </section>

          {/* Policy Changes */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">11. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of significant changes by posting the updated policy on our website and updating the "Last Updated" date. Your continued use of our services constitutes acceptance of the revised Privacy Policy.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">12. Contact Us</h2>
            <p>
              If you have questions, concerns, or wish to exercise your privacy rights, please contact us:
            </p>
            <div className="bg-light p-4 rounded mt-3">
              <p><strong>Bankify</strong></p>
              <p>
                Email: <a href="mailto:privacy@bankify.com">privacy@bankify.com</a>
              </p>
              <p>
                Phone: +1-800-BANKING-1
              </p>
              <p>
                Address: 123 Financial Street, Banking City, BC 12345
              </p>
              <p>
                Customer Service Hours: Monday - Friday, 9:00 AM - 5:00 PM EST
              </p>
            </div>
          </section>

          {/* Regulatory Compliance */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">13. Regulatory Compliance</h2>
            <p>
              Our privacy practices comply with applicable regulations including:
            </p>
            <ul>
              <li>Gramm-Leach-Bliley Act (GLBA)</li>
              <li>Fair Credit Reporting Act (FCRA)</li>
              <li>General Data Protection Regulation (GDPR)</li>
              <li>California Consumer Privacy Act (CCPA)</li>
              <li>Payment Card Industry Data Security Standard (PCI-DSS)</li>
              <li>Banking Secrecy Act (BSA)</li>
            </ul>
          </section>

          <hr className="my-5" />
          
          <p className="text-muted small">
            This Privacy Policy is provided for informational purposes and should not be construed as legal advice. For specific questions about your data and privacy, please consult with our legal team or contact us directly.
          </p>
        </div>
      </div>
    </div>
  );
};
