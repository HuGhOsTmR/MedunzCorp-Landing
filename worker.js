const SITE_CONFIG = {
  "hupi.medunzcorp.com": {
    title: "HUPI Baby Gym | Estimulación adecuada para el mejor desarrollo",
    description: "Un espacio pensado para acompañar a bebés y niños a través del juego, el movimiento y experiencias que favorecen su desarrollo integral.",
    image: "https://hupi.medunzcorp.com/hupi-card.webp",
    siteName: "HUPI Baby Gym",
    locale: "es_BO",
    url: "https://hupi.medunzcorp.com/"
  },
  "www.hupi.medunzcorp.com": {
    title: "HUPI Baby Gym | Estimulación adecuada para el mejor desarrollo",
    description: "Un espacio pensado para acompañar a bebés y niños a través del juego, el movimiento y experiencias que favorecen su desarrollo integral.",
    image: "https://hupi.medunzcorp.com/hupi-card.webp",
    siteName: "HUPI Baby Gym",
    locale: "es_BO",
    url: "https://hupi.medunzcorp.com/"
  },
  "ghost.medunzcorp.com": {
    title: "GHOST Web & Software | We design. We build solutions. We drive your digital future",
    description: "GHOST Web & Software Designer. Software, web, ERP, CRM y soluciones digitales.",
    image: "https://ghost.medunzcorp.com/ghost-card.webp",
    siteName: "GHOST Web & Software",
    locale: "en_US",
    url: "https://ghost.medunzcorp.com/"
  },
  "www.ghost.medunzcorp.com": {
    title: "GHOST Web & Software | We design. We build solutions. We drive your digital future",
    description: "GHOST Web & Software Designer. Software, web, ERP, CRM y soluciones digitales.",
    image: "https://ghost.medunzcorp.com/ghost-card.webp",
    siteName: "GHOST Web & Software",
    locale: "en_US",
    url: "https://ghost.medunzcorp.com/"
  },
  "pharma.medunzcorp.com": {
    title: "Medunz Pharma | Salud al alcance de más personas",
    description: "Medunz Pharma | Distribuidora de medicamentos. Venta al por mayor y menor, cobertura regional y atención profesional.",
    image: "https://pharma.medunzcorp.com/medunz-pharma-brand.jpg",
    siteName: "Medunz Pharma",
    locale: "es_BO",
    url: "https://pharma.medunzcorp.com/"
  },
  "www.pharma.medunzcorp.com": {
    title: "Medunz Pharma | Salud al alcance de más personas",
    description: "Medunz Pharma | Distribuidora de medicamentos. Venta al por mayor y menor, cobertura regional y atención profesional.",
    image: "https://pharma.medunzcorp.com/medunz-pharma-brand.jpg",
    siteName: "Medunz Pharma",
    locale: "es_BO",
    url: "https://pharma.medunzcorp.com/"
  },
  "jardines.medunzcorp.com": {
    title: "Medunz Jardines | Naturaleza que inspira",
    description: "Medunz Jardines | Mantenimiento, diseño, construcción y paisajismo para crear espacios en armonía con la naturaleza.",
    image: "https://jardines.medunzcorp.com/jardines-social.svg",
    siteName: "Medunz Jardines",
    locale: "es_BO",
    url: "https://jardines.medunzcorp.com/"
  },
  "www.jardines.medunzcorp.com": {
    title: "Medunz Jardines | Naturaleza que inspira",
    description: "Medunz Jardines | Mantenimiento, diseño, construcción y paisajismo para crear espacios en armonía con la naturaleza.",
    image: "https://jardines.medunzcorp.com/jardines-social.svg",
    siteName: "Medunz Jardines",
    locale: "es_BO",
    url: "https://jardines.medunzcorp.com/"
  },
  "mrcatering.medunzcorp.com": {
    title: "M&R Catering | Es como comer en casa...",
    description: "M&R Catering | Servicio de catering con el sabor, calidad y calidez de siempre.",
    image: "https://mrcatering.medunzcorp.com/mrcatering-card.webp",
    siteName: "M&R Catering",
    locale: "es_BO",
    url: "https://mrcatering.medunzcorp.com/"
  },
  "www.mrcatering.medunzcorp.com": {
    title: "M&R Catering | Es como comer en casa...",
    description: "M&R Catering | Servicio de catering con el sabor, calidad y calidez de siempre.",
    image: "https://mrcatering.medunzcorp.com/mrcatering-card.webp",
    siteName: "M&R Catering",
    locale: "es_BO",
    url: "https://mrcatering.medunzcorp.com/"
  },
  "medriv.medunzcorp.com": {
    title: "MedRiv Bienes Raíces | Espacios para tu futuro",
    description: "MedRiv Bienes Raíces | Compra, venta y asesoría inmobiliaria con confianza, respaldo y visión.",
    image: "https://medriv.medunzcorp.com/medriv-card.webp",
    siteName: "MedRiv Bienes Raíces",
    locale: "es_BO",
    url: "https://medriv.medunzcorp.com/"
  },
  "www.medriv.medunzcorp.com": {
    title: "MedRiv Bienes Raíces | Espacios para tu futuro",
    description: "MedRiv Bienes Raíces | Compra, venta y asesoría inmobiliaria con confianza, respaldo y visión.",
    image: "https://medriv.medunzcorp.com/medriv-card.webp",
    siteName: "MedRiv Bienes Raíces",
    locale: "es_BO",
    url: "https://medriv.medunzcorp.com/"
  }
};

const DEFAULT_SITE = {
  title: "MedUnz Corp. | Una mirada que transforma",
  description: "MedUnz Corp. | Una mirada que transforma.",
  image: "https://medunzcorp.com/medunz-corp-hero.webp",
  siteName: "MedUnz Corp.",
  locale: "es_BO",
  url: "https://medunzcorp.com/"
};

function metaProperty(name, value) {
  return `<meta property="${name}" content="${value}">`;
}

function metaName(name, value) {
  return `<meta name="${name}" content="${value}">`;
}

function buildSocialTags(site) {
  const encoded = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

  return [
    metaProperty("og:type", "website"),
    metaProperty("og:title", encoded(site.title)),
    metaProperty("og:description", encoded(site.description)),
    metaProperty("og:url", encoded(site.url)),
    metaProperty("og:site_name", encoded(site.siteName)),
    metaProperty("og:locale", encoded(site.locale)),
    metaProperty("og:image", encoded(site.image)),
    metaProperty("og:image:secure_url", encoded(site.image)),
    metaProperty(
      "og:image:type",
      site.image.toLowerCase().endsWith(".jpg") || site.image.toLowerCase().endsWith(".jpeg")
        ? "image/jpeg"
        : site.image.toLowerCase().endsWith(".svg")
          ? "image/svg+xml"
          : "image/webp"
    ),
    metaProperty("og:image:alt", encoded(site.siteName)),
    metaName("twitter:card", "summary_large_image"),
    metaName("twitter:title", encoded(site.title)),
    metaName("twitter:description", encoded(site.description)),
    metaName("twitter:image", encoded(site.image)),
    '<link rel="canonical" href="' + encoded(site.url) + '">'
  ].join("\n");
}

class RemoveElement {
  element(element) {
    element.remove();
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const site = SITE_CONFIG[url.hostname] || DEFAULT_SITE;

    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("text/html")) {
      return response;
    }

    const rewritten = new HTMLRewriter()
      .on('meta[property^="og:"]', new RemoveElement())
      .on('meta[name^="twitter:"]', new RemoveElement())
      .on('meta[name="description"]', new RemoveElement())
      .on('link[rel="canonical"]', new RemoveElement())
      .on("title", {
        element(element) {
          element.setInnerContent(site.title);
        }
      })
      .on("head", {
        element(element) {
          element.append(buildSocialTags(site), { html: true });
        }
      })
      .transform(response);

    const headers = new Headers(response.headers);
    headers.set("cache-control", "public, max-age=300, s-maxage=300");
    headers.set("vary", "Host");

    return new Response(rewritten.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
