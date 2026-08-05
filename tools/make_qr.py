#!/usr/bin/env python3
"""tools/links.json 의 주소로 assets/qr/*.svg 를 만듭니다.

    pip install qrcode
    python3 tools/make_qr.py

주소가 비어 있는 항목은 "준비 중" 자리표시자 QR로 만들어집니다.
영상을 올린 뒤 links.json 에 주소를 넣고 다시 실행하세요.
(assets/js/app.js 의 VIDEOS 값도 같이 채워야 웹에서 클릭됩니다.)
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "qr"
OUT.mkdir(parents=True, exist_ok=True)

PLACEHOLDER = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="QR 코드 준비 중">
  <rect x="1" y="1" width="118" height="118" fill="#ffffff" stroke="#aabece" stroke-width="2" stroke-dasharray="6 5"/>
  <text x="60" y="55" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#8697a6">QR</text>
  <text x="60" y="74" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#a5b5c2">준비 중</text>
</svg>
"""


def make(name: str, url: str) -> str:
    path = OUT / f"{name}.svg"
    if not url:
        path.write_text(PLACEHOLDER, encoding="utf-8")
        return f"{name}.svg  (자리표시자 — 주소 없음)"

    import qrcode
    import qrcode.image.svg

    img = qrcode.make(
        url,
        image_factory=qrcode.image.svg.SvgPathImage,
        box_size=10,
        border=2,
    )
    img.save(str(path))
    return f"{name}.svg  →  {url}"


def main() -> int:
    data = json.loads((ROOT / "tools" / "links.json").read_text(encoding="utf-8"))
    targets = {k: v for k, v in data.items() if not k.startswith("_")}
    if not targets:
        print("links.json 에 만들 항목이 없습니다.")
        return 1
    for name, url in targets.items():
        print("생성:", make(name, url if isinstance(url, str) else ""))
    print(f"\n{len(targets)}개를 {OUT} 에 만들었습니다.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
