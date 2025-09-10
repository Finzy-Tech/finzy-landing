const WEBSITE_TEXT = {
  name: "Finzy",
  description: "Your Finance Companion",
  number: "123-456-7890",
  address: "Hiranandani Gardens, Powai, Mumbai, Maharashtra 400076",
  email: "info@finzy.com"
};

const NAVBAR_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

const SERVICE_CARDS = [
  {
    heading: "Investment Services",
    title: "Investment Planning",
    description: "Plan your investments wisely with tailored strategies that align with your financial goals, risk appetite, and time horizon. Our experts help you diversify your portfolio and maximize returns.",
    icon: "/first-service.avif"
  },
  {
    heading: "Retirement Services",
    title: "Retirement Planning",
    description: "Secure your future with our comprehensive retirement plans. We guide you through pension options, savings schemes, and investment vehicles to ensure a comfortable and stress-free retirement.",
    icon: "/second-service.avif"
  },
  {
    heading: "Tax Optimization Services",
    title: "Tax Optimization",
    description: "Minimize your tax liabilities effectively through smart planning and expert advice. We help you leverage deductions, exemptions, and investment choices to optimize your tax outgo.",
    icon: "/third-service.avif"
  }
];

export { WEBSITE_TEXT, NAVBAR_LINKS, SERVICE_CARDS };