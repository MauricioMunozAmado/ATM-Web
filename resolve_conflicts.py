import re

# Resolve index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Conflict 1: Logo
logo_conflict = re.compile(r'<<<<<<< HEAD\s*<div class="logo">.*?</div>\s*=======\s*<div class="logo">.*?</div>\s*>>>>>>> 095ef9e \(idiomas\)', re.DOTALL)
html = logo_conflict.sub(r'''            <div class="logo">
                <img src="images/logo.png" alt="Atmósfera de Seguridad" class="logo-image">
                <div class="logo-text"></div>
            </div>''', html)

# Conflict 2: Contact form addition inside <main>
# The incoming branch added the contact form AND a footer inside it. We want the contact form, but not the duplicate footer.
# So we extract the contact section and drop the footer.
def resolve_contact(m):
    incoming = m.group(1)
    # find contact-section
    contact_match = re.search(r'(<!-- Sección Formulario de Contacto -->\s*<section id="atencion-usuario" class="contact-section">.*?</section>)', incoming, re.DOTALL)
    if contact_match:
        return contact_match.group(1)
    return incoming

html = re.sub(r'<<<<<<< HEAD\s*=======\s*(.*?)\s*>>>>>>> 095ef9e \(idiomas\)', resolve_contact, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# Resolve styles.css
with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Conflict 1:
css = re.sub(r'<<<<<<< HEAD\n\s*QUIENES SOMOS \(IDENTITY & CERTIFICATIONS\)\n\s*========================================== \*/\n\n=======\n', '', css)
css = re.sub(r'>>>>>>> 095ef9e \(idiomas\)\n', '', css)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Conflicts resolved.")
