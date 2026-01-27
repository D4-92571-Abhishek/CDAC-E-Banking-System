import React, { useEffect } from "react";

export const TermsAndServices = () => {
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
          <h1 className="mb-4 text-primary">Terms & Services</h1>
          <p className="text-muted">Last Updated: January 2025</p>

          {/* Agreement Acceptance */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">1. Agreement to Terms</h2>
            <p>
              These Terms & Services ("Terms," "Agreement") constitute a legally binding agreement between you ("User," "Client," "Customer") and Bankify ("Company," "We," "Us," "Our"). By accessing, browsing, or using our website and services, you acknowledge that you have read, understood, and agree to be bound by all terms, conditions, and policies outlined herein.
            </p>
            <p>
              If you do not agree to these terms, you are prohibited from using this service and must discontinue use immediately.
            </p>
          </section>

          {/* Eligibility and Account Requirements */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">2. Eligibility and Account Requirements</h2>
            <p>By using our services, you represent and warrant that:</p>
            <ul>
              <li>You are at least 18 years of age (or legal age in your jurisdiction)</li>
              <li>You are legally capable of entering into a binding contract</li>
              <li>You are not restricted by any sanctions or prohibited from using our services</li>
              <li>All information you provide is accurate, truthful, and current</li>
              <li>You have the legal authority to enter into agreements</li>
              <li>You are not a citizen or resident of a sanctioned country</li>
              <li>You will comply with all applicable laws and regulations</li>
            </ul>
            <p>
              We reserve the right to verify your identity and may request additional documentation at any time.
            </p>
          </section>

          {/* Account Creation and Security */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">3. Account Creation and Security</h2>
            
            <h5 className="mt-4 mb-3">A. Registration Process</h5>
            <p>
              During account creation, you must provide accurate information and keep your profile updated. You are responsible for maintaining the confidentiality of your login credentials and are accountable for all activities under your account.
            </p>

            <h5 className="mt-4 mb-3">B. Password Security</h5>
            <ul>
              <li>Create a strong, unique password with uppercase, lowercase, numbers, and symbols</li>
              <li>Never share your password with anyone, including bank employees</li>
              <li>Change your password regularly (minimum every 90 days)</li>
              <li>Immediately notify us of unauthorized account access</li>
              <li>Log out after each session, especially on shared devices</li>
            </ul>

            <h5 className="mt-4 mb-3">C. User Responsibility</h5>
            <p>
              You are responsible for all activities occurring under your account. We are not liable for unauthorized access resulting from your negligence. Report any suspicious activity immediately.
            </p>
          </section>

          {/* Services Provided */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">4. Services Provided</h2>
            <p>CDAC E-Banking System offers the following services:</p>
            <ul>
              <li>Account creation and management</li>
              <li>Deposits and withdrawals</li>
              <li>Fund transfers (domestic and international)</li>
              <li>Loan applications and management</li>
              <li>Transaction history and statements</li>
              <li>Bill payments and recurring transactions</li>
              <li>Account monitoring and alerts</li>
              <li>Financial tools and calculators</li>
              <li>Customer support and dispute resolution</li>
            </ul>
            <p>
              Service availability may be subject to technical maintenance, updates, or unforeseen circumstances.
            </p>
          </section>

          {/* Fees and Charges */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">5. Fees and Charges</h2>
            <p>
              We may charge fees for various services including but not limited to:
            </p>
            <ul>
              <li>Account maintenance fees</li>
              <li>Transaction fees (for certain types of transfers)</li>
              <li>Wire transfer fees</li>
              <li>Overdraft fees</li>
              <li>Loan origination and processing fees</li>
              <li>Account statement copies</li>
              <li>Penalty fees for non-compliance</li>
            </ul>
            <p>
              All applicable fees will be disclosed before processing any transaction. We reserve the right to modify fees with 30 days' notice.
            </p>
          </section>

          {/* User Conduct and Prohibited Activities */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">6. User Conduct and Prohibited Activities</h2>
            <p>You agree NOT to:</p>
            <ul>
              <li>Engage in fraudulent, illegal, or harmful activities</li>
              <li>Attempt to access unauthorized areas of the platform</li>
              <li>Use the service for money laundering or terrorist financing</li>
              <li>Share your account credentials with others</li>
              <li>Reverse-engineer, decompile, or attempt to discover source code</li>
              <li>Use automated tools or bots to scrape data</li>
              <li>Interfere with platform functionality or security</li>
              <li>Harass, abuse, or threaten other users or staff</li>
              <li>Post offensive, discriminatory, or illegal content</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Create multiple accounts to exploit bonuses or bypass restrictions</li>
              <li>Engage in market manipulation or insider trading</li>
            </ul>
            <p>
              Violation of these terms may result in immediate account suspension, legal action, and loss of funds.
            </p>
          </section>

          {/* Transactions and Payment Processing */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">7. Transactions and Payment Processing</h2>
            
            <h5 className="mt-4 mb-3">A. Transaction Authorization</h5>
            <p>
              By initiating a transaction, you authorize us to debit your account for the specified amount. All transactions are subject to verification and may be delayed or rejected if suspicious activity is detected.
            </p>

            <h5 className="mt-4 mb-3">B. Processing Times</h5>
            <ul>
              <li>Domestic transfers: 1-3 business days</li>
              <li>International transfers: 3-7 business days</li>
              <li>Immediate transfers between CDAC accounts: Real-time</li>
              <li>Deposits: 1-2 business days (depending on source)</li>
            </ul>

            <h5 className="mt-4 mb-3">C. Errors and Reversals</h5>
            <p>
              If you believe a transaction was processed in error, you must report it within 30 days. We will investigate and, if warranted, reverse the transaction. You are responsible for providing accurate recipient information.
            </p>
          </section>

          {/* Loan Terms and Conditions */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">8. Loan Terms and Conditions</h2>
            <p>
              Loan applications are subject to credit review and manager approval. By applying for a loan, you agree that:
            </p>
            <ul>
              <li>All provided financial information is accurate and complete</li>
              <li>We may verify information with third-party sources</li>
              <li>Approval is not guaranteed and is at our discretion</li>
              <li>Interest rates and terms will be specified in the loan agreement</li>
              <li>Late payments may incur penalties and affect credit score</li>
              <li>Loan default may result in collection actions</li>
              <li>You must maintain specified insurance on collateral (if applicable)</li>
            </ul>
          </section>

          {/* Intellectual Property Rights */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">9. Intellectual Property Rights</h2>
            <p>
              All content on our platform, including text, graphics, logos, images, software, and designs, are the property of Bankify or licensed to us. You may not:
            </p>
            <ul>
              <li>Reproduce, distribute, or transmit any content without permission</li>
              <li>Modify, adapt, or create derivative works</li>
              <li>Use content for commercial purposes</li>
              <li>Remove or alter any proprietary notices</li>
            </ul>
            <p>
              Unauthorized use may result in legal action and damages.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">10. Limitation of Liability</h2>
            <p>
              CDAC E-Banking System and its officers, employees, and agents shall not be liable for:
            </p>
            <ul>
              <li>Direct, indirect, incidental, or consequential damages</li>
              <li>Loss of profits, data, or business opportunities</li>
              <li>System downtime or technical failures</li>
              <li>Unauthorized account access (absent our negligence)</li>
              <li>Third-party actions or errors</li>
              <li>Errors in transaction processing (except those caused by our negligence)</li>
              <li>Market fluctuations or economic conditions</li>
            </ul>
            <p>
              Our total liability shall not exceed the amount of fees paid in the preceding 12 months.
            </p>
          </section>

          {/* Disclaimer of Warranties */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">11. Disclaimer of Warranties</h2>
            <p>
              Our platform is provided "AS IS" and "AS AVAILABLE" without warranties of any kind. We disclaim all warranties, express or implied, including:
            </p>
            <ul>
              <li>Merchantability and fitness for a particular purpose</li>
              <li>Non-infringement of third-party rights</li>
              <li>Accuracy or completeness of information</li>
              <li>Uninterrupted or error-free service</li>
            </ul>
            <p>
              We do not guarantee that our services will meet your expectations or that defects will be corrected.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">12. Dispute Resolution</h2>
            
            <h5 className="mt-4 mb-3">A. Informal Resolution</h5>
            <p>
              In the event of a dispute, you agree to attempt resolution through our customer service department first.
            </p>

            <h5 className="mt-4 mb-3">B. Arbitration</h5>
            <p>
              Any dispute that cannot be resolved informally shall be subject to binding arbitration under applicable laws. You waive the right to jury trial and class action participation.
            </p>

            <h5 className="mt-4 mb-3">C. Legal Action</h5>
            <p>
              Any legal action must be initiated within one year of the dispute or be permanently barred.
            </p>
          </section>

          {/* Termination of Service */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">13. Termination of Service</h2>
            <p>
              We may suspend or terminate your account immediately without notice if:
            </p>
            <ul>
              <li>You violate these Terms & Services</li>
              <li>You engage in fraudulent or illegal activities</li>
              <li>You fail to maintain minimum balance requirements</li>
              <li>You are subject to legal or regulatory action</li>
              <li>We determine service is no longer available in your jurisdiction</li>
              <li>You request account closure</li>
            </ul>
            <p>
              Upon termination, you remain responsible for all outstanding fees and obligations.
            </p>
          </section>

          {/* Indemnification */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">14. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Bankify, its officers, employees, and agents from any claims, damages, losses, or expenses (including attorney fees) arising from:
            </p>
            <ul>
              <li>Your violation of these Terms & Services</li>
              <li>Your violation of applicable laws or third-party rights</li>
              <li>Your use of our services</li>
              <li>Your transaction disputes or chargebacks</li>
            </ul>
          </section>

          {/* Third-Party Links and Content */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">15. Third-Party Links and Content</h2>
            <p>
              Our platform may contain links to third-party websites and services. We are not responsible for:
            </p>
            <ul>
              <li>The accuracy or content of third-party sites</li>
              <li>Transactions conducted through external platforms</li>
              <li>Third-party privacy policies or terms</li>
              <li>Technical issues or security breaches on external sites</li>
            </ul>
            <p>
              Your use of third-party services is governed by their terms and conditions.
            </p>
          </section>

          {/* Modifications to Terms */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">16. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms & Services at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes constitutes acceptance of the revised terms. We recommend reviewing this page periodically.
            </p>
          </section>

          {/* Regulatory Compliance */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">17. Regulatory Compliance</h2>
            <p>
              Our services are subject to and comply with applicable banking regulations, including:
            </p>
            <ul>
              <li>Banking Secrecy Act (BSA)</li>
              <li>Anti-Money Laundering (AML) regulations</li>
              <li>Office of Foreign Assets Control (OFAC) guidelines</li>
              <li>Know Your Customer (KYC) requirements</li>
              <li>Fair Credit Reporting Act (FCRA)</li>
              <li>Gramm-Leach-Bliley Act (GLBA)</li>
              <li>Payment Card Industry Data Security Standard (PCI-DSS)</li>
            </ul>
          </section>

          {/* Contact Information */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">18. Contact Information</h2>
            <p>
              For questions about these Terms & Services or to report violations, please contact us:
            </p>
            <div className="bg-light p-4 rounded mt-3">
              <p><strong>Bankify</strong></p>
              <p>
                Email: <a href="mailto:support@bankify.com">support@bankify.com</a>
              </p>
              <p>
                Phone: +1-800-BANKING-1
              </p>
              <p>
                Address: 123 Financial Street, Banking City, BC 12345
              </p>
              <p>
                Compliance Department: <a href="mailto:compliance@cdacebanking.com">compliance@cdacebanking.com</a>
              </p>
              
            </div>
          </section>

          {/* Governing Law */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">19. Governing Law and Jurisdiction</h2>
            <p>
              These Terms & Services are governed by and construed in accordance with the laws of the jurisdiction where Bankify is headquartered, without regard to its conflict of law provisions. Any legal action or dispute shall be brought exclusively in the courts located within that jurisdiction.
            </p>
          </section>

          {/* Severability */}
          <section className="mb-5">
            <h2 className="h4 mb-3 text-secondary">20. Severability</h2>
            <p>
              If any provision of these Terms & Services is found to be invalid or unenforceable, that provision shall be severed, and the remaining provisions shall continue in full force and effect.
            </p>
          </section>

          <hr className="my-5" />
          
          <p className="text-muted small">
            By using Bankify, you acknowledge that you have read and agree to all terms and conditions set forth herein. If you have any questions or concerns, please contact our support team immediately.
          </p>
        </div>
      </div>
    </div>
  );
};
