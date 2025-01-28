import React from "react";
import Layout from "../../MainComponent/Layout";
import { Accordion } from "react-bootstrap";
import "./Policies.css";

const PrivacyPolicy = () => {
  const privacyData = [
    {
      title: "Information We Collect",
      content: [
        "Name and contact information",
        "Shipping and billing addresses",
        "Payment information",
        "Device and browser information",
        "Shopping preferences and history",
      ],
    },
    {
      title: "How We Use Your Information",
      content: [
        "Process and fulfill orders",
        "Send order updates and notifications",
        "Improve our products and services",
        "Personalize your shopping experience",
        "Prevent fraud and enhance security",
      ],
    },
    {
      title: "Information Sharing",
      content: [
        "Never sold to third parties",
        "Shared only with delivery partners",
        "Used for processing payments",
        "Required by law enforcement",
        "Anonymous analytics data",
      ],
    },
    {
      title: "Your Privacy Rights",
      content: [
        "Right to access your data",
        "Right to correct information",
        "Right to delete your account",
        "Right to data portability",
        "Right to withdraw consent",
      ],
    },
  ];

  return (
    <Layout title="Privacy Policy">
      <div className="policy-container">
        <h1 className="text-center mb-4">Privacy Policy</h1>
        <div className="policy-content">
          <Accordion className="custom-accordion">
            {privacyData.map((section, index) => (
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

export default PrivacyPolicy;
