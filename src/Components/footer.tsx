import React from "react";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { LuCopy } from "react-icons/lu";
import { LuCheck } from "react-icons/lu";
import { useState } from "react";

export default function Footer() {
  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);

  return (
    <div>
      <div className="bg-bg border-t border-white/15 w-full px-[15vw] py-10">
        <div className="grid grid-cols-3 items-center">
          <div className="flex flex-row gap-6 items-center">
            <img
              className="h-13 justify-self-start"
              src="public\Logo-CircleOutlined-Yellow.png"></img>
            <div className="text-sm font-normal">
              <div>Developed by</div>
              <div>George Allman</div>
            </div>
          </div>

          <div className="flex flex-row gap-3 justify-self-center">
            <a
              href="https://www.linkedin.com/company/usydelectrical"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 border-white/15 flex items-center justify-center text-text-h hover:text-accent transition-colors">
              <FaLinkedin className="w-7 h-7 " />
            </a>
            <a
              href="https://www.linkedin.com/company/usydelectrical"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 border-white/15 flex items-center justify-center text-text-h hover:text-accent transition-colors">
              <RiInstagramFill className="w-7 h-7 " />
            </a>
            <a
              href="https://www.linkedin.com/company/usydelectrical"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 border-white/15 flex items-center justify-center text-text-h hover:text-accent transition-colors">
              <FaFacebookSquare className="w-7 h-7 " />
            </a>
          </div>
          <div className="flex flex-col justify-self-end">
            <div className="flex flex-row gap-3 justify-end">
              <div className="text-text-h text-sm font-normal">
                Member Inquiries:
              </div>
              <div className="text-text text-sm font-normal">
                admin@sparksoc.com
              </div>
              <div>
                <button
                  onClick={async () => {
                    if (copied1) return;
                    await navigator.clipboard.writeText("admin@sparksoc.com");
                    setCopied1(true);
                    setTimeout(() => setCopied1(false), 1500);
                  }}
                  aria-label="Copy to clipboard"
                  className="relative w-5 h-5 inline-block">
                  <LuCopy
                    className={`absolute inset-0 transition-all duration-200 ease-out ${
                      copied1
                        ? "scale-0 opacity-0"
                        : "scale-100 opacity-100 hover:scale-110"
                    }`}
                  />
                  <LuCheck
                    className={`absolute inset-0 transition-all duration-200 ease-out ${
                      copied1 ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="flex flex-row gap-3">
              <div className="text-text-h text-sm font-normal">
                Industry Inquiries:
              </div>
              <div className="text-text text-sm font-normal">
                sponsorship@sparksoc.com
              </div>
              <div>
                <button
                  onClick={async () => {
                    if (copied2) return;
                    await navigator.clipboard.writeText(
                      "sponsorship@sparksoc.com",
                    );
                    setCopied2(true);
                    setTimeout(() => setCopied2(false), 1500);
                  }}
                  aria-label="Copy to clipboard"
                  className="relative w-5 h-5 inline-block">
                  <LuCopy
                    className={`absolute inset-0 transition-all duration-200 ease-out ${
                      copied2
                        ? "scale-0 opacity-0"
                        : "scale-100 opacity-100 hover:scale-110"
                    }`}
                  />
                  <LuCheck
                    className={`absolute inset-0 transition-all duration-200 ease-out ${
                      copied2 ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
