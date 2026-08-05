#!/usr/bin/env python3
"""assets/img/ 의 자리표시자 이미지를 만듭니다.

실제 캡처를 넣을 때는 이 스크립트를 다시 돌릴 필요가 없습니다.
같은 파일명으로 캡처를 덮어쓰기만 하면 됩니다.

    python3 tools/make_placeholders.py

권장 캡처 크기는 아래 표의 가로·세로와 같은 비율, 가로 1400px 이상입니다.
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent / "assets" / "img"
OUT.mkdir(parents=True, exist_ok=True)

REG = "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc"
BLD = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"

BG, BORDER, TITLE, SUB = (247, 249, 250), (198, 210, 217), (94, 110, 120), (140, 155, 165)

# (파일명, 가로, 세로, 제목, 설명)
ITEMS = [
    # 금융 데이터 — 대표 이미지는 크게 들어갑니다
    ("finance-dashboard.png",        1600, 1000, "대사 결과 대시보드",   "오류 유형별 건수와 개별 이슈 목록이 함께 보이는 화면"),
    ("finance-reconcile-output.png", 1400,  900, "대사 실행 결과",       "python pipeline/reconcile.py 콘솔 출력"),
    # MAPLESSUNDAY — 휴대폰 화면 (9:19.5)
    ("maple-predict.png",             900, 1950, "이벤트 예측 화면",     "다음 썬데이메이플 예측 결과"),
    ("maple-calendar.png",            900, 1950, "썬데이 캘린더",        "역대 이벤트 이력"),
    ("maple-character.png",           900, 1950, "캐릭터 조회",          "닉네임 검색 결과"),
    ("maple-notice.png",              900, 1950, "공지 조회",            "공지·업데이트 통합 목록"),
    ("maple-inven-post.png",         1400,  900, "인벤 홍보 게시글",     "누적 조회수가 보이는 구간"),
    # 스팩스페이스
    ("sfac-eval-table.png",          1600, 1000, "평가 조건 정리표",     "근거 등급이 보이는 표 일부 · 회사 정보와 서버 경로 마스킹"),
    ("sfac-relic-landing.png",       1600, 1000, "Relic 랜딩페이지",     "상단 히어로 구간"),
    ("sfac-3d-result.png",           1200,  900, "3D 생성 결과 예시",    "한국 문화 특화 에셋"),
    # Withmarry
    ("withmarry-landing.png",        1400,  900, "Withmarry 랜딩페이지", "서비스 소개 화면"),
    ("withmarry-invite.png",          900, 1950, "모바일 청첩장",        "데모용 샘플 · 고객 정보 제거"),
    ("withmarry-voice.png",           900, 1950, "AI 음성 기능",         "음성 재생 화면"),
    # 달빛장어
    ("moonlight-sales.png",          1400,  900, "달빛장어 대시보드",    "매출·월별 집계 화면 · 민감한 금액은 가림"),
]


def font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.load_default()


def wrap(draw, text, fnt, max_w):
    words, lines, cur = text.split(" "), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=fnt) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def build(name, w, h, title, sub):
    img = Image.new("RGB", (w, h), BG)
    d = ImageDraw.Draw(img)

    step, dash = 26, 15
    for x in range(0, w, step):
        d.line([(x, 2), (min(x + dash, w), 2)], fill=BORDER, width=4)
        d.line([(x, h - 3), (min(x + dash, w), h - 3)], fill=BORDER, width=4)
    for y in range(0, h, step):
        d.line([(2, y), (2, min(y + dash, h))], fill=BORDER, width=4)
        d.line([(w - 3, y), (w - 3, min(y + dash, h))], fill=BORDER, width=4)

    # 세로로 긴 이미지는 글자를 더 크게 (화면에서 작게 표시되므로)
    base = w if h <= w * 1.2 else w * 1.35
    ts, ss = max(28, int(base * 0.052)), max(20, int(base * 0.032))
    ft, fs = font(BLD, ts), font(REG, ss)

    max_w = w * 0.84
    t_lines = wrap(d, title, ft, max_w)
    s_lines = wrap(d, sub, fs, max_w)
    lh_t, lh_s = ts * 1.35, ss * 1.5

    y = (h - (len(t_lines) * lh_t + len(s_lines) * lh_s + ss)) / 2
    for ln in t_lines:
        d.text(((w - d.textlength(ln, font=ft)) / 2, y), ln, font=ft, fill=TITLE)
        y += lh_t
    y += ss * 0.6
    for ln in s_lines:
        d.text(((w - d.textlength(ln, font=fs)) / 2, y), ln, font=fs, fill=SUB)
        y += lh_s

    img.save(OUT / name, optimize=True)
    return name


if __name__ == "__main__":
    keep = {i[0] for i in ITEMS}
    for old in OUT.glob("*.png"):
        if old.name not in keep:
            old.unlink()
            print("삭제(더 이상 쓰지 않음):", old.name)
    for item in ITEMS:
        print("생성:", build(*item))
    print(f"\n{len(ITEMS)}개를 {OUT} 에 만들었습니다.")
