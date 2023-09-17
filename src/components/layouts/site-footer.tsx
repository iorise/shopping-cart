import React from "react";
import { Shell } from "../Shells/shell";
import { siteConfig } from "@/config/site-config";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <Shell as="div">
        <section className=" text-sm text-muted-foreground">
          <ul className="justify-center gap-x-6 flex">
            {siteConfig.footer.map((item) => (
              <div key={item.title} className="space-y-3">
                <li>
                  <Link href={item.href} target="_blank">
                    {item.title}
                  </Link>
                </li>
              </div>
            ))}
          </ul>
        </section>
      </Shell>
    </footer>
  );
}
