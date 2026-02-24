
import os

file_path = r"c:\Users\Mauricio Muñoz\Nextcloud\ATM\Atm Web\styles.css"
new_css = """
/* Transición suave hacia la siguiente sección */
.banner-section::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 150px;
    background: linear-gradient(to bottom, transparent 0%, #f8f9fa 100%);
    pointer-events: none;
    z-index: 1;
}
"""

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the line with key content to insert after
insert_index = -1
for i, line in enumerate(lines):
    if ".banner-section::before {" in line:
        # Search forward for the closing brace
        for j in range(i, len(lines)):
            if "}" in lines[j]:
                if "z-index: 0;" in lines[j-1]: # confirmation check
                   insert_index = j + 1
                   break
        break

if insert_index != -1:
    lines.insert(insert_index, new_css)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Successfully inserted CSS.")
else:
    print("Could not find insertion point.")
