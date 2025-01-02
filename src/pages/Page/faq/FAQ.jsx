import React from "react";
import { Accordion } from "react-bootstrap";
import { motion } from "framer-motion";
import "./faq.css";
import Layout from "../../../MainComponent/Layout.jsx";

const FaqComponent = () => {
  const faqData = [
    {
      question: "What is your return policy?",
      answer: "Our return policy allows you to return items within 30 days of purchase. Make sure the item is in its original condition and packaging."
    },
    {
      question: "How can I track my order?",
      answer: "You can track your order by logging into your account and checking the order status under the My Orders section."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we offer international shipping to most countries. Shipping costs and delivery times will vary depending on the destination."
    },
    {
      question: "How do I contact customer service?",
      answer: "You can contact our customer service team via email at support@example.com or by calling our hotline at 1-800-123-4567."
    },
    {
      question: "Can I cancel or change my order after it has been placed?",
      answer: "Once an order has been placed, it is processed immediately. However, you can contact customer service to see if changes can still be made."
    }
  ];

  return (
   < Layout >
  
    <div className="faq-section">
      <div className="container py-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find answers to common questions about our products and services
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="faq-container"
        >
          <Accordion defaultActiveKey="0" className="custom-accordion">
            {faqData.map((faq, index) => (
              <Accordion.Item key={index} eventKey={index.toString()}>
                <Accordion.Header>
                  {faq.question}
                </Accordion.Header>
                <Accordion.Body>
                  {faq.answer}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
    </Layout>
  );
};

export default FaqComponent;
