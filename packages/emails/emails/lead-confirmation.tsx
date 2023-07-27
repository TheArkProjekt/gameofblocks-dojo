import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://www.arkproject.dev"
    : "http://localhost:3000";

export const LeadConfirmationEmail = () => (
  <Html>
    <Head />
    <Preview>Welcome to the ArkProject</Preview>
    <Tailwind>
      <Body style={main}>
        <Container className="w-[600px]">
          <Img
            src={`${baseUrl}/emails/arkproject-header.png`}
            width="600"
            height="200"
            alt="ArkProject header"
          />
          <Section className="bg-[#0E2230] px-[20px] pb-[20px]">
            <Heading style={h1}>Thank you for subscribing!</Heading>
            <Text
              style={{
                ...text,
                color: "#D6DEE6",
                marginTop: "14px",
                marginBottom: "16px",
              }}
            >
              {
                "We appreciate your interest in our platform and are excited to have you on board."
              }
            </Text>
            <Text
              style={{
                ...text,
                color: "#D6DEE6",
                marginTop: "12px",
                marginBottom: "38px",
              }}
            >
              {
                "You'll be among the first to receive news and updates about our upcoming features. We're diligently working behind the scenes to bring you an exceptional toolkit for NFT creation and seamless trading on Starknet."
              }
            </Text>
            <Text
              style={{
                ...text,
                color: "#D6DEE6",
                marginTop: "12px",
                marginBottom: "38px",
              }}
            >
              {
                "To stay connected and get the latest information, make sure to follow us on our social media channels "
              }
              <Link
                className="text-[#F8545C]"
                href="https://twitter.com/ArkProjectNFTs"
              >
                Twitter
              </Link>
              {" or "}
              <Link
                className="text-[#F8545C]"
                href="https://t.me/arkprojectnfts"
              >
                Telegram
              </Link>
              {
                " We'll be sharing exciting insights, progress updates, and important announcements that you won't want to miss."
              }
            </Text>
            <Text
              style={{
                ...text,
                color: "#D6DEE6",
                marginTop: "12px",
                marginBottom: "38px",
              }}
            >
              {
                "If you have any questions or ideas, we'd love to hear from you. Your feedback is invaluable as we continue to shape The Ark Project and create a platform that meets your needs."
              }
            </Text>
            <Text
              style={{
                ...text,
                color: "#D6DEE6",
                marginTop: "12px",
                marginBottom: "38px",
              }}
            >
              {
                "We look forward to sharing our upcoming features and developments with you soon!"
              }
            </Text>
            <Text
              style={{
                ...text,
                color: "#D6DEE6",
                marginTop: "12px",
                marginBottom: "38px",
              }}
            >
              {"- The Ark Project Team"}
            </Text>
            <Img
              src={`${baseUrl}/emails/arkproject-logo.png`}
              width="229"
              height="30"
              alt="Notion's Logo"
            />
            <Text style={footer}>
              <Link
                href="https://arkproject.dev"
                target="_blank"
                style={{ ...link, color: "#898989" }}
              >
                arkproject.dev
              </Link>
              , NTF creation made easy on Starknet. 👉👈
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default LeadConfirmationEmail;

const main = {
  backgroundColor: "#ffffff",
};

const h1 = {
  color: "white",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "40px",
  padding: "0",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const footer = {
  color: "#898989",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "12px",
  marginBottom: "24px",
};
