import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
    Heading,
    Hr,
} from "@react-email/components";
import * as React from "react";

type VerifyEmailProps = {
    otp: number;
    appName?: string;
    userName?: string;
};

export default function VerifyEmail({
    otp = 123456,
    appName = "AnonAsk",
    userName = "Yaseen"
}: VerifyEmailProps) {
    return (
        <Html>
            <Head />
            <Body style={body}>
                <Container style={container}>
                    <Section style={{ textAlign: "center" }}>
                        <Heading style={heading}>
                            Hey {userName}
                        </Heading>

                        <Text style={text}>
                            Use the OTP below to complete your signup on <b style={appNameStyle}>{appName}</b>.
                        </Text>

                        <Section style={otpBox}>
                            <Text style={otpText}>{otp}</Text>
                        </Section>

                        <Text style={muted}>
                            This code is valid for <b>1 hour</b>.
                        </Text>

                        <Hr style={divider} />

                        <Text style={footer}>
                            If you didn’t request this, you can safely ignore this email.
                        </Text>

                        <Text style={brand}>
                            © {new Date().getFullYear()} {appName}
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

/* ---------------- styles ---------------- */

const body = {
    backgroundColor: "#ffffff",
    color: "#171717",
    fontFamily: "Inter, Arial, sans-serif",
};

const container = {
    maxWidth: "450px",
    margin: "40px auto",
    padding: "32px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f6f6f6",
};

const appNameStyle = {
    color: "#8e51ff"
}

const heading = {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "12px",
};

const text = {
    fontSize: "14px",
    marginBottom: "20px",
};

const otpBox = {
    backgroundColor: "#f5f5f4",
    border: "1px dashed #8e51ff",
    borderRadius: "10px",
    padding: "16px",
    marginBottom: "16px",
};

const otpText = {
    fontSize: "28px",
    fontWeight: "700",
    letterSpacing: "6px",
    color: "#8e51ff",
};

const muted = {
    fontSize: "13px",
    color: "#6b7280",
};

const divider = {
    borderColor: "#e5e7eb",
    margin: "24px 0",
};

const footer = {
    fontSize: "12px",
    color: "#6b7280",
};

const brand = {
    fontSize: "11px",
    color: "#9ca3af",
    marginTop: "12px",
};
