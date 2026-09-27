import os
import zipfile

target = '/tmp/eduexcellence-brev-hackathon.zip'
if os.path.exists(target):
    try:
        os.remove(target)
    except Exception:
        pass

with zipfile.ZipFile(target, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', '.cache', 'dist']]
        for file in files:
            if file.endswith('.zip'):
                continue
            path = os.path.join(root, file)
            zipf.write(path, os.path.relpath(path, '.'))

print(f"Zip created successfully: {os.path.getsize(target)} bytes")
