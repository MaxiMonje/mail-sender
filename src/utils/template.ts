import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import juice from "juice";

const TPL_ROOT = path.join(__dirname, "..", "templates");
const PARTIALS_DIR = path.join(TPL_ROOT, "partials");
const EMAILS_DIR = path.join(TPL_ROOT, "emails");

// Registrar parciales
function registerPartials() {
  if (!fs.existsSync(PARTIALS_DIR)) return;
  const files = fs.readdirSync(PARTIALS_DIR).filter(f => f.endsWith(".hbs"));
  for (const f of files) {
    const name = path.basename(f, ".hbs");
    const content = fs.readFileSync(path.join(PARTIALS_DIR, f), "utf8");
    Handlebars.registerPartial(name, content);
  }
}

// Helpers simples
Handlebars.registerHelper("eq", (a, b) => a === b);
Handlebars.registerHelper("upper", (s: string) => (s || "").toUpperCase());

registerPartials();

export async function renderTemplate(
  name: string,
  variables: Record<string, any> = {}
): Promise<string> {
  const file = path.join(EMAILS_DIR, `${name}.hbs`);
  if (!fs.existsSync(file)) {
    throw new Error(`Email template not found: ${name}`);
  }
  const source = fs.readFileSync(file, "utf8");
  const compiled = Handlebars.compile(source, { noEscape: true });
  const html = compiled(variables);
  // CSS inline para máxima compatibilidad
  return juice(html);
}
