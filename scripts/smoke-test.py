import urllib.request

base = "http://localhost:8001"
files = [
    "content/science/chemistry/topics.json",
    "content/science/chemistry/composition-of-matter.md",
    "content/science/chemistry/structure-of-matter.md",
    "content/science/chemistry/states-and-phase-changes.md",
    "content/science/chemistry/common-reactions.md",
    "content/science/chemistry/life-chemistry.md",
    "questions/science/chemistry/composition-of-matter.json",
    "questions/science/chemistry/structure-of-matter.json",
    "questions/science/chemistry/states-and-phase-changes.json",
    "questions/science/chemistry/common-reactions.json",
    "questions/science/chemistry/life-chemistry.json",
]
passed = 0
for f in files:
    try:
        r = urllib.request.urlopen(f"{base}/{f}")
        print(f"PASS: {f.split('/')[-1]} ({r.status})")
        passed += 1
    except Exception as e:
        print(f"FAIL: {f.split('/')[-1]} - {e}")
print(f"\n{passed}/{len(files)} passed")
