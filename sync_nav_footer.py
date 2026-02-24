import os
import re
import glob

html_files = glob.glob('*.html')
if 'index.html' not in html_files:
    print("Error: index.html not found")
    exit(1)

with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Extract navbar
nav_match = re.search(r'(<nav class="navbar">.*?</nav>)', index_content, re.DOTALL)
if not nav_match:
    print("Error: Could not find navbar in index.html")
    exit(1)
navbar_html = nav_match.group(1)

# Extract footer
footer_match = re.search(r'(<footer class="footer">.*?</footer>)', index_content, re.DOTALL)
if not footer_match:
    print("Error: Could not find footer in index.html")
    exit(1)
footer_html = footer_match.group(1)

files_updated = []
for file in html_files:
    if file == 'index.html':
        continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace navbar
    content = re.sub(r'<nav class="navbar">.*?</nav>', lambda m: navbar_html, content, flags=re.DOTALL)
    
    # Replace footer
    content = re.sub(r'<footer class="footer">.*?</footer>', lambda m: footer_html, content, flags=re.DOTALL)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    files_updated.append(file)

print(f"Successfully updated navbars and footers in: {', '.join(files_updated)}")
