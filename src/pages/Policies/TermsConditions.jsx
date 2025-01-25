import React from "react";
import Layout from "../../MainComponent/Layout";
import { Accordion } from "react-bootstrap";
import "./Policies.css";

const TermsConditions = () => {
  const termsData = [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing our website, you agree to these terms",
        "Terms may be updated without notice",
        "Continued use constitutes acceptance of changes",
        "Users must be 18 years or older",
        "Valid email required for account creation",
      ],
    },
    {
      title: "User Accounts & Security",
      content: [
        "Users are responsible for maintaining account security",
        "Password must meet minimum security requirements",
        "Account sharing is not permitted",
        "Suspicious activity must be reported immediately",
        "We reserve the right to suspend accounts",
      ],
    },
    {
      title: "Product Information & Pricing",
      content: [
        "All prices are in Indian Rupees (INR)",
        "Prices subject to change without notice",
        "Product images are representative only",
        "We reserve the right to limit quantities",
        "Specifications may vary from descriptions",
      ],
    },
    {
      title: "Intellectual Property Rights",
      content: [
        "All content is protected by copyright",
        "Trademarks are property of respective owners",
        "No content may be used without permission",
        "User content remains property of users",
        "License granted for personal use only",
      ],
    },
  ];

  return (
    <Layout title="Terms and Conditions">
      <div className="policy-container">
        <h1 className="text-center mb-4">Terms and Conditions</h1>
        <div className="policy-content">
          <Accordion className="custom-accordion">
            {termsData.map((section, index) => (
              <Accordion.Item key={index} eventKey={index.toString()}>
                <Accordion.Header>{section.title}</Accordion.Header>
                <Accordion.Body>
                  <ul className="policy-list">
                    {section.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </div>
    </Layout>
  );
};

export default TermsConditions;
