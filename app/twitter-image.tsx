import { createSocialImageResponse, socialImageSize } from "@/lib/social-image";

export const alt =
  "TradeSaurs, resource belajar trading berbahasa Indonesia untuk ICT, SMC, dan Traders Family.";

export const size = socialImageSize;

export const contentType = "image/png";

export default function TwitterImage() {
  return createSocialImageResponse();
}
