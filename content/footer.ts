export type FooterItem = { label: string; value: string; href?: string };
export type FooterSection = { title: string; items: FooterItem[] };

export const footerConfig: {
  brand: string;
  backgroundSrc: string;
  tagline: string[];
  sections: FooterSection[];
} = {
  brand: "ELLIE.",
  backgroundSrc: "/images/figma-hero/desk-surface.png",
  tagline: [
    "AI keeps expanding the boundaries of design.",
    "Stay curious, keep learning, and grow through practice.",
  ],
  sections: [
    {
      title: "Personal Info",
      items: [
        { label: "Role", value: "UI/UX Designer" },
        { label: "Status", value: "Open to Work" },
      ],
    },
    {
      title: "Contact Me",
      items: [
        { label: "Email", value: "Ellie33551@outlook.com", href: "mailto:Ellie33551@outlook.com" },
        { label: "WeChat", value: "gift-357" },
        { label: "Phone", value: "13198686695", href: "tel:13198686695" },
      ],
    },
  ],
};
