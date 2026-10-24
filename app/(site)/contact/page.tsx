import type { Metadata } from "next";
import { Container, PageHeader, Main, Icon, Callout } from "@/components/ui";
import { absUrl } from "@/lib/site";
import ContactForm from "./ContactForm";
import s from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Scrie-ne o întrebare, o sugestie sau o greșeală găsită pe FocusTax.",
  alternates: { canonical: absUrl("/contact") },
};

export default function ContactPage() {
  return (
    <Main>
      <PageHeader
        crumbs={[{ label: "Contact" }]}
        eyebrow="Contact"
        title="Scrie-ne"
        lead="Ai găsit o greșeală, ai o sugestie sau nu găsești un răspuns? Ne ajută orice mesaj."
      />
      <Container>
        <div className={s.layout}>
          <ContactForm />
          <aside className={s.aside}>
            <a href="mailto:focustaxro@gmail.com" className={s.card}>
              <Icon name="mail" />
              <span><strong>Email</strong>focustaxro@gmail.com</span>
            </a>
            <div className={s.card}>
              <Icon name="clock" />
              <span><strong>Răspundem</strong>de obicei în 1–2 zile lucrătoare</span>
            </div>
            <Callout tone="neutral">
              FocusTax oferă informații educative. Pentru situația ta concretă, un expert contabil sau un consultant fiscal autorizat îți poate da un răspuns oficial.
            </Callout>
          </aside>
        </div>
      </Container>
    </Main>
  );
}
