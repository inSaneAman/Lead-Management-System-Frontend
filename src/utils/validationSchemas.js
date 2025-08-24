import * as Yup from "yup";

export const loginSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
});

export const signupSchema = Yup.object({
    firstName: Yup.string()
        .min(2, "First name must be at least 2 characters")
        .required("First name is required"),
    lastName: Yup.string()
        .min(2, "Last name must be at least 2 characters")
        .required("Last name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        )
        .required("Password is required"),
});

export const createLeadSchema = Yup.object({
    first_name: Yup.string()
        .min(2, "First name must be at least 2 characters")
        .required("First name is required"),
    last_name: Yup.string()
        .min(2, "Last name must be at least 2 characters")
        .required("Last name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    phone: Yup.string()
        .matches(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number")
        .required("Phone number is required"),
    company: Yup.string()
        .min(2, "Company name must be at least 2 characters")
        .required("Company name is required"),
    city: Yup.string()
        .min(2, "City must be at least 2 characters")
        .required("City is required"),
    state: Yup.string()
        .min(2, "State must be at least 2 characters")
        .required("State is required"),
    source: Yup.string()
        .oneOf([
            "website",
            "facebook_ads",
            "google_ads",
            "referral",
            "events",
            "other",
        ])
        .required("Source is required"),
    status: Yup.string()
        .oneOf(["new", "contacted", "qualified", "lost", "won"])
        .required("Status is required"),
    score: Yup.number().min(0).max(100).integer().required("Score is required"),
    lead_value: Yup.number().min(0).required("Lead value is required"),
    last_activity_at: Yup.date()
        .nullable()
        .max(new Date(), "Last activity cannot be in the future"),
    is_qualified: Yup.boolean(),
});
