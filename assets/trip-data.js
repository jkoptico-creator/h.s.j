/* 여행 플래너 데이터 — itinerary.html 이 이 파일을 읽어 화면을 만듭니다.
   시간·장소를 바꾸려면 이 파일만 고치면 됩니다. 각 항목의 뜻:
   t    시각(“08:20”, “10:00 전후”, “예약 시각”처럼 자유롭게) · name 제목 · sub 설명 · addr 주소(화면 표시)
   q    지도 검색어(영문 권장) · site 웹사이트 · tel 전화 · key 사진(assets/places.js 의 GALLERY 키)
   type plane·car·walk·ferry·buggy·hotel·dining·golf·show·spa·boat·shop·pin 중 하나(아이콘)
   opt  true = 선택 일정 · alt true = 대안(기본 일정 대신 고를 수 있음)
   st   예약 상태: ok(예약 완료) need(예약 필요) ask(문의 중) chk(확인 필요) — “기획 보기”에서만 표시
   note 기획 메모(“기획 보기”에서만 표시) · cost 예상 비용(기획 보기)
   via  이동 행: {via:'car'|'walk'|'ferry'|'buggy'|'plane', text:'차량 약 30–45분', mode:'driving'|'walking'}
   예약번호·여권·승객 이름 같은 개인정보는 넣지 않습니다. */
window.TRIP = {
  title: '시드니 → 해밀턴 아일랜드 → 브리즈번',
  dates: '2026년 11월 15일(일) – 21일(토)',
  updated: '2026년 10월 21일 저녁',
  lookbook: 'plan-2-sydney-hamilton-brisbane.html',
  days: [
    {
      id: 'd15', date: '2026-11-15', dow: '일', n: 0, city: '인천', tz: 'Asia/Seoul', tzLabel: '한국 시각',
      title: '인천 출발',
      intro: '저녁 비행기입니다. 출발 3시간 전에 공항에 닿도록 움직이고, 기내에서 잠을 자 두면 시드니 아침 일정이 편합니다.',
      stay: { name: '기내', sub: '아시아나 프레스티지 · 시드니행 야간 비행' },
      bring: ['여권 · 호주 ETA 확인', '골프복 · 골프화 · 장갑', '운동화(해안 산책 · 브리지 클라임)', '모기 기피제', '멀티 어댑터(호주 I타입)', '선크림 · 모자 · 선글라스', '얇은 겉옷'],
      items: [
        { t: '17:00', type: 'plane', name: '인천공항 제2터미널 · 아시아나 카운터', sub: '출발 3시간 전 · 수하물 1인 2개까지 · 항공권은 대한항공 KE5001로 발권되었고 운항은 아시아나 OZ601입니다', addr: '인천국제공항 제2터미널', q: 'Incheon International Airport Terminal 2', st: 'ok', note: '터미널은 출발 전날 항공사 앱에서 한 번 더 확인(전자항공권 기준 제2터미널).' },
        { t: '20:00', type: 'plane', name: 'OZ601 인천 → 시드니', sub: '10시간 20분 · 프레스티지(비즈니스) · 16일 08:20 시드니 도착(현지 시각)', key: 'biz_class_a380', st: 'ok', note: '발권 완료. 좌석 지정 여부 확인.' }
      ]
    },
    {
      id: 'd16', date: '2026-11-16', dow: '월', n: 1, city: '시드니', tz: 'Australia/Sydney', tzLabel: '시드니 시각 · 한국 +2시간',
      title: '시드니 도착 · 해안 산책 · 오페라하우스 · 하버 야경 요트',
      intro: '아침에 내려 짐을 맡기고 바다를 걷는 날입니다. 오후에 오페라하우스 한국어 투어를 보고, 같은 건물의 Bennelong에서 이른 저녁을 먹은 뒤, 바로 옆 선착장에서 프라이빗 요트를 타고 해 지는 하버브리지와 오페라하우스의 불빛을 바다에서 봅니다. 피곤하면 아침 산책을 줄이거나 빼도 됩니다.',
      stay: { name: 'Capella Sydney', sub: '24 Loftus St, Sydney NSW 2000', tel: '+61 2 9071 5000', q: 'Capella Sydney, 24 Loftus Street Sydney', key: 'capella_sydney', nights: '1/2박' },
      bring: ['편한 운동화', '겉옷(밤 바다 바람 · 17°C 안팎)', '선크림 · 모자', '요트에서는 신발을 벗는 곳이 많습니다'],
      items: [
        { t: '08:20', type: 'plane', name: '시드니 공항 제1터미널 도착 · OZ601', sub: '입국 심사와 수하물 수령 약 60–90분 · 식품·흙 묻은 골프화는 신고 대상이니 골프화는 깨끗이', q: 'Sydney Airport International Terminal 1', st: 'ok' },
        { via: 'car', text: '공항 → 호텔 차량 약 30–45분 (우버 · 택시 또는 예약 픽업)', mode: 'driving' },
        { t: '10:00 전후', type: 'hotel', name: 'Capella Sydney · 짐 보관', sub: '객실이 준비되기 전이면 짐만 맡기고 나섭니다 · 얼리 체크인은 호텔과 미리 조율', addr: '24 Loftus St, Sydney', q: 'Capella Sydney, 24 Loftus Street Sydney', tel: '+61 2 9071 5000', key: 'capella_sydney', st: 'ok', note: '2박 예약 상태와 얼리 체크인 가능 여부 확인.' },
        { via: 'car', text: '본다이까지 차량 약 30–45분', mode: 'driving' },
        { t: '10:45 전후', type: 'walk', name: '본다이 → 브론테 해안 산책 · 약 2–2.5km', sub: '사진·휴식 포함 1–1.5시간 · 계단과 경사가 있습니다 · 늦게 도착했거나 피곤하면 본다이 해변만 보고 이동', q: 'Bondi to Bronte Coastal Walk', key: 'bondi_coogee' },
        { via: 'car', text: '브론테 → 쿠지 차량 약 15–20분', mode: 'driving' },
        { t: '12:30', type: 'dining', name: 'Coogee Pavilion 점심', sub: '바다 앞 캐주얼 다이닝 · 루프탑은 성인 전용 · 당일 운영 시간 확인', addr: '169 Dolphin St, Coogee', q: 'Coogee Pavilion, 169 Dolphin Street Coogee', key: 'coogee_pavilion', st: 'need', note: '2명 12:30 예약. 루프탑 좌석 요청.' },
        { via: 'car', text: '쿠지 → 호텔 차량 약 30–45분', mode: 'driving' },
        { t: '14:15', type: 'hotel', name: 'Capella Sydney 체크인 · 휴식', sub: '객실 준비 시간에 따라 투어 뒤 체크인으로 바뀔 수 있습니다', q: 'Capella Sydney, 24 Loftus Street Sydney', key: 'capella_sydney' },
        { via: 'walk', text: '오페라하우스까지 도보 약 15–20분 (서큘러키 방향)', mode: 'walking' },
        { t: '15:30', type: 'pin', name: '오페라하우스 한국어 투어 집결 · 15:45 시작', sub: '약 30분 · 집결은 하부 콘코스의 Welcome Centre · 문의 02 8188 3734', addr: 'Bennelong Point, Sydney', q: 'Sydney Opera House Welcome Centre', tel: '+61 2 8188 3734', key: 'opera_house_tour', st: 'need', note: '11/16(월) 15:45 한국어 회차 운영 여부와 잔여 좌석 확인 후 예매. 성인 A$37(온라인).', cost: 'A$37 × 2' },
        { t: '16:30', type: 'pin', name: '휴식 · Opera Bar', sub: '하부 콘코스의 Opera Bar에서 항구를 보며 한 시간 쉬거나, 호텔로 돌아가 쉽니다(도보 15분)', q: 'Opera Bar Sydney' },
        { t: '17:30', type: 'dining', name: 'Bennelong 저녁 · 오페라하우스 안', sub: '첫 타임 · 19:15까지 식사를 마치는 목표 · 일–목 저녁 예약 17:30–20:45 · 문의 02 9240 8000', addr: 'Sydney Opera House, Bennelong Point', q: 'Bennelong Restaurant Sydney Opera House', tel: '+61 2 9240 8000', key: 'bennelong', st: 'need', note: '2명 17:30 예약 · 19:15 출발 예정이라고 미리 알리기 · 창가 요청.' },
        { via: 'walk', text: '서큘러키 동쪽 선착장(Eastern Pontoon)까지 도보 약 5분', mode: 'walking' },
        { t: '19:30', type: 'boat', name: '하버 야경 프라이빗 요트 · 3시간', sub: '일몰(19:36)에 맞춰 출항해 하버브리지 아래, 오페라하우스 앞, 시티 불빛을 바다에서 봅니다 · 선장·승무원·바 포함, 두 분만 탑승 · 22:30 하선(4시간 조건이면 23:30)', addr: 'Eastern Pontoon, Circular Quay', q: 'Eastern Pontoon Circular Quay Sydney', key: 'harbour_yacht', st: 'ask', note: '골드코스트 YOT Capri(92피트 Mangusta, 3시간 A$4,275 + 케이터링)와 같은 급. 후보 ① Element 80피트 Warren Yachts — 11월 A$1,450/시간, 공식 최소 4시간(3시간은 문의), 승무원 A$400, 선착장 A$50/회, 음료 A$20/인/시간~, Elite Chefs 케이터링, Eastern Pontoon 승선 가능 → 3시간 약 A$5,300 / 4시간 약 A$6,800 (케이터링 포함 추정) ② Privacy 87피트 Warren — 11월 A$1,850/시간·최소 4시간, 웨이트 스태프 2명 A$800, 선착장 A$75/회, 승선은 King St Wharf·카지노 선착장 → 약 A$8,500~ ③ Lady Pamela 100피트 Azimut — A$1,850/시간, Eastern Pontoon 승선 가능 ④ 더 작게: MV Alfie II Sunseeker Predator 68 A$1,000/시간(12명), Aqua Bay 70피트 A$950/시간. 문의: Sydney Harbour Specialists sydneyhs.com.au · Boat Hire Sydney 0437 752 424. 저녁 출항은 보통 17:30 이후, 11월은 4시간 최소가 많아 3시간 가능 여부부터 확인.', cost: 'A$ 약 5,300–8,500 (3–4시간 · 음료·케이터링 포함 추정)' },
        { via: 'car', text: '하선 뒤 호텔까지 택시 약 5분 또는 도보 15분', mode: 'walking' },
        { t: '22:45 전후', type: 'hotel', name: '호텔 복귀', sub: '내일 골프 출발 06:45 · 골프 가방 정리', q: 'Capella Sydney, 24 Loftus Street Sydney' },
        { t: '대안', type: 'boat', alt: true, name: '요트를 저녁 전으로 · 17:30–20:30 선셋 크루즈 → Bennelong 20:45', sub: '해 질 녘과 초저녁 불빛을 보고 마지막 예약 시간인 20:45에 식사 · 요트가 4시간 조건이면 선상 디너(셰프 케이터링)로 바꾸고 Bennelong은 취소', q: 'Eastern Pontoon Circular Quay Sydney', key: 'harbour_yacht', note: '야경을 길게 보려면 기본안(저녁 뒤 19:30 출항)이 낫고, 저녁을 늦게 먹고 싶으면 이 안.' },
        { t: '대안', type: 'spa', alt: true, name: '38° 배스하우스 · 본다이', sub: '아침 해안 산책과 쿠지 점심 대신 본다이에서 90분 세션과 점심을 잡는 안 · 둘 다 넣지는 않습니다', q: '38 The Bathhouse Bondi', key: 'bathhouse_bondi', note: '세션 예약제. 선택 시 산책·쿠지 예약 취소.' }
      ],
      notes: '저녁 순서: 투어 15:45 → Opera Bar → Bennelong 17:30 → 19:30 요트(일몰 19:36 출항, 야경 3시간) → 22:45 호텔. 요트가 4시간만 된다면 23:30 하선(한국 시각 21:30이라 무리 없음). 공항 픽업(골프백 2개)도 예약.'
    },
    {
      id: 'd17', date: '2026-11-17', dow: '화', n: 2, city: '시드니', tz: 'Australia/Sydney', tzLabel: '시드니 시각 · 한국 +2시간',
      title: 'NSW 골프클럽 · 이른 저녁 · 하버브리지 클라임',
      intro: '오전은 라페루즈의 NSW Golf Club 18홀입니다. 점심 뒤 패딩턴을 짧게 보거나 호텔에서 쉬고, 17시에 호텔 옆 Spezia에서 이른 저녁을 먹은 뒤 해질녘 브리지 클라임에 오릅니다. 활동량이 많은 날이라 패딩턴은 빼도 됩니다.',
      stay: { name: 'Capella Sydney', sub: '24 Loftus St, Sydney NSW 2000', tel: '+61 2 9071 5000', q: 'Capella Sydney, 24 Loftus Street Sydney', key: 'capella_sydney', nights: '2/2박' },
      bring: ['골프복 · 골프화 · 장갑', '모자 · 선크림', '운동화 · 긴바지(클라임)', '바람막이'],
      items: [
        { t: '06:00', type: 'dining', name: '이른 조식 · 룸서비스', sub: '골프 전 간단히', q: 'Capella Sydney, 24 Loftus Street Sydney' },
        { t: '06:45', type: 'car', name: '호텔 출발', sub: '골프 가방 2개 · 큰 차량', q: 'Capella Sydney, 24 Loftus Street Sydney', st: 'need', note: '왕복 차량(골프백 2개) 예약. 돌아오는 편은 13:30 전후.' },
        { via: 'car', text: '라페루즈까지 차량 약 35–50분 (아침 교통)', mode: 'driving' },
        { t: '07:30', type: 'golf', name: 'NSW Golf Club 도착 · 수속', sub: '티타임 30분 전 · 드레스코드: 칼라 셔츠, 긴바지 또는 테일러드 쇼츠, 골프화 · 비회원은 클럽 승인이 필요합니다', addr: 'Henry Head, Botany Bay National Park, La Perouse', q: 'NSW Golf Club, La Perouse', tel: '+61 2 9661 4455', key: 'nsw_golf_club', st: 'chk', note: '비회원 플레이 승인·핸디캡 증명 요구 여부·카트 가능 여부 확인. 프로샵 +61 2 9311 7222.' },
        { t: '08:00 예시', type: 'golf', name: 'NSW Golf Club · 18홀', sub: '약 4–4.5시간 · 바다 위 링크스, 바람이 강합니다', q: 'NSW Golf Club, La Perouse', key: 'nsw_golf_club', st: 'need', note: '오전 티타임 확보가 이 날의 전제. 안 되면 골프를 오후로 옮기고 클라임을 다른 회차로.' },
        { t: '12:30', type: 'dining', name: '클럽하우스 점심', sub: '보타니베이 전망', q: 'NSW Golf Club, La Perouse', key: 'nsw_golf_club' },
        { via: 'car', text: '패딩턴까지 차량 약 25–35분', mode: 'driving' },
        { t: '13:45', type: 'shop', opt: true, name: '패딩턴 부티크 산책 · 선택', sub: '옥스퍼드 스트리트와 윌리엄 스트리트의 작은 가게들 · 1시간 안팎', q: 'William Street, Paddington NSW', key: 'paddington' },
        { via: 'car', text: '호텔까지 차량 약 20–30분', mode: 'driving' },
        { t: '15:15', type: 'hotel', name: '호텔 휴식', sub: '클라임 전 충분히 쉽니다', q: 'Capella Sydney, 24 Loftus Street Sydney', key: 'capella_sydney' },
        { via: 'walk', text: 'Spezia까지 도보 약 3–5분 (호텔 바로 옆 블록)', mode: 'walking' },
        { t: '17:00', type: 'dining', name: 'Spezia 이른 저녁', sub: '이탈리안 · 화–토 저녁 17:00–21:00 · 18:00까지 식사를 마치는 목표', addr: '5 Gresham St, Sydney', q: 'Spezia, 5 Gresham Street Sydney', key: 'spezia', st: 'need', note: '17:00 오픈 첫 타임 2명 예약 · 클라임 회차가 바뀌면 시간도 같이 조정.' },
        { via: 'walk', text: 'BridgeClimb 집결지까지 도보 약 15분 (더록스)', mode: 'walking' },
        { t: '18:15 예시', type: 'pin', name: 'BridgeClimb 집결', sub: '출발 15분 전 · 운동화 · 카메라와 휴대폰은 반입 불가(보관함)', addr: '3 Cumberland St, The Rocks', q: 'BridgeClimb Sydney, 3 Cumberland Street The Rocks', tel: '+61 2 8274 7777', key: 'bridgeclimb' },
        { t: '18:30 예시', type: 'pin', name: 'Summit Insider · 해질녘 회차', sub: '사다리가 없는 코스 · 총 약 2.5시간 · 해질녘(약 19:35) 회차는 날짜별로 시각이 다릅니다', q: 'BridgeClimb Sydney, 3 Cumberland Street The Rocks', key: 'bridgeclimb', st: 'need', note: '트와일라이트 회차 시각 확인 후 Spezia 시간 연동.', cost: 'A$ 회차별 상이' },
        { via: 'walk', text: '호텔까지 도보 약 15분', mode: 'walking' },
        { t: '21:15 전후', type: 'hotel', name: '호텔 복귀', sub: '내일 07:15 출발 · 짐 정리', q: 'Capella Sydney, 24 Loftus Street Sydney' }
      ],
      notes: '골프 티타임과 클라임 회차가 모두 확정되어야 저녁 시간을 고정할 수 있습니다. 순서: ① 티타임 ② 클라임 ③ Spezia.'
    },
    {
      id: 'd18', date: '2026-11-18', dow: '수', n: 3, city: '해밀턴 아일랜드', short: '해밀턴', tz: 'Australia/Brisbane', tzLabel: '오전은 시드니 시각 · 도착 뒤 퀸즐랜드 시각(시드니 −1시간 · 한국 +1시간)',
      title: '시드니 → 해밀턴 아일랜드 · 리조트 휴식',
      intro: '전날 밤 클라임을 마친 뒤라 아침은 느긋하게 보내고, 낮 비행기(버진 VA1283 12:40)로 섬에 건너갑니다. 시드니보다 한 시간 느린 퀸즐랜드 시각으로 바뀌니 도착하면 시계를 한 시간 뒤로 돌립니다. 오후 늦게 체크인해 쉬거나 스파를 넣고, 해 질 녘 바다를 본 뒤 Long Pavilion에서 저녁을 먹습니다.',
      stay: { name: 'qualia · Leeward Pavilion', sub: '20 Whitsunday Blvd, Hamilton Island QLD 4803', tel: '+61 7 4948 9222', q: 'qualia, Hamilton Island', key: 'qualia_leeward', nights: '1/2박' },
      bring: ['모기 기피제(저녁)', '샌들 · 선글라스', '수하물은 qualia 차량이 운반'],
      items: [
        { t: '08:30', type: 'dining', name: '조식 · 느긋한 아침', sub: '전날 클라임 뒤 늦잠 가능 · 짐 정리', q: 'Capella Sydney, 24 Loftus Street Sydney', tz: 'Australia/Sydney' },
        { t: '09:45', type: 'walk', opt: true, name: '왕립 식물원 · 미세스 매쿼리 체어 산책 · 선택', sub: '호텔에서 걸어서 5분 · 오페라하우스와 하버브리지가 한 장에 담기는 전망 · 40분 안팎', q: 'Mrs Macquaries Chair Sydney', key: 'mrs_macquaries', tz: 'Australia/Sydney' },
        { t: '10:30', type: 'hotel', name: '체크아웃', sub: '미니바·세탁 정산', q: 'Capella Sydney, 24 Loftus Street Sydney', tz: 'Australia/Sydney' },
        { t: '10:45', type: 'car', name: '호텔 출발', sub: '국내선 제2터미널(버진 오스트레일리아)로', q: 'Capella Sydney, 24 Loftus Street Sydney', tz: 'Australia/Sydney', st: 'need', note: '공항 차량(골프백 2개) 10:45 예약.' },
        { via: 'car', text: '시드니 국내선 T2까지 차량 약 30–45분', mode: 'driving' },
        { t: '11:25', type: 'plane', name: '시드니 공항 제2터미널 · 버진 체크인', sub: '출발 75분 전 · 비즈니스 라운지에서 가볍게 점심', q: 'Sydney Airport Terminal 2 Domestic', tz: 'Australia/Sydney' },
        { t: '12:40', type: 'plane', name: 'VA1283 시드니 → 해밀턴 아일랜드', sub: '2시간 30분 · 14:10 도착(퀸즐랜드 시각) · 보잉 737-800 비즈니스 · 기내식 점심 · 10월 25일 이후 매일 운항 스케줄 기준', key: 'reef_view', tz: 'Australia/Sydney', st: 'need', note: '콴타스 QF578(09:40)은 비즈니스 잔여석이 없어 버진으로. 예약 시 비즈니스 2석 · 위탁 수하물(골프백 포함) 한도 확인. 발권 전 항공사 사이트에서 운항 재확인.', cost: 'A$ 2명 비즈니스 약 1,200–1,600' },
        { t: '14:10', type: 'plane', name: '해밀턴 아일랜드 공항 도착', sub: '퀸즐랜드 시각 · 수하물 수령 후 qualia 직원 픽업', q: 'Hamilton Island Airport', st: 'chk', note: 'qualia에 항공편(VA1283 14:10 도착) 미리 통보 → 공항 픽업 자동 배정.' },
        { via: 'car', text: 'qualia 전용 차량 약 10–15분', mode: 'driving' },
        { t: '14:45', type: 'hotel', name: 'qualia 도착 · 웰컴 · Leeward Pavilion 체크인', sub: '체크인 15:00 · 객실 준비 전이면 Long Pavilion에서 음료와 함께 대기', addr: '20 Whitsunday Blvd, Hamilton Island', q: 'qualia, Hamilton Island', tel: '+61 7 4948 9222', key: 'qualia_leeward', st: 'ok', note: '2박 Leeward Pavilion.' },
        { t: '16:30 예시', type: 'spa', opt: true, name: 'Spa qualia · 커플 트리트먼트 90분 · 선택', sub: '사전 예약 · 비행이 늦어지면 생략하거나 시간을 바꿉니다 · 변경·취소 조건 확인', q: 'Spa qualia Hamilton Island', key: 'spa_qualia', st: 'need', note: '예약 변경은 6시간 전까지(이후 전액 청구 조건 있음). 도착 14:10 기준 16:30 이후가 안전.', cost: 'A$ 커플 90분 약 700–900' },
        { t: '17:45', type: 'pin', name: '선셋 · Pebble Beach 또는 객실 테라스', sub: '해밀턴 아일랜드 일몰 약 18:20', q: 'Pebble Beach qualia Hamilton Island', key: 'pebble_beach' },
        { t: '19:00', type: 'dining', name: 'Long Pavilion 저녁', sub: '리조트 메인 다이닝 · 바다 전망', q: 'Long Pavilion qualia Hamilton Island', key: 'long_pavilion', st: 'need', note: '2명 19:00 · 창가.' },
        { t: '대안', type: 'plane', alt: true, name: 'QF578 09:40 → 11:10 (콴타스)', sub: '비즈니스 좌석이 풀리면 이쪽이 섬 시간을 세 시간 더 줍니다 · 그 경우 07:15 호텔 출발, Pebble Beach 점심 12:30', q: 'Sydney Airport Terminal 3 Qantas Domestic', note: '현재 비즈니스 잔여석 없음.' }
      ],
      notes: '국내선은 버진 VA1283(12:40 · T2)으로 확정 방향. 전날 밤 클라임 뒤라 늦은 출발이 오히려 편하고, 잃는 것은 섬에서의 점심 한 끼와 오후 세 시간입니다. 스파는 16:30 이후로.'
    },
    {
      id: 'd19', date: '2026-11-19', dow: '목', n: 4, city: '해밀턴 아일랜드', short: '해밀턴', tz: 'Australia/Brisbane', tzLabel: '퀸즐랜드 시각 · 한국 +1시간',
      title: '덴트섬 골프 · 선셋 크루즈 · coca chu',
      intro: '하루에 한 가지만 크게 잡는 날입니다. 기본은 아침 페리로 건너가는 Hamilton Island Golf Club 18홀이고, 화이트헤이븐을 우선하면 골프 대신 힐인렛 투어를 고릅니다. 오후에 쉬고, 원하면 저녁 전 바다에서 해 지는 것을 보는 선셋 크루즈를 넣습니다.',
      stay: { name: 'qualia · Leeward Pavilion', sub: '20 Whitsunday Blvd, Hamilton Island QLD 4803', tel: '+61 7 4948 9222', q: 'qualia, Hamilton Island', key: 'qualia_leeward', nights: '2/2박' },
      bring: ['골프복 · 골프화 · 장갑', '모자 · 선크림(자외선 매우 강함)', '모기 기피제', '크루즈용 얇은 겉옷'],
      items: [
        { t: '06:45', type: 'dining', name: '조식 · Long Pavilion', sub: '골프 전 가볍게', q: 'Long Pavilion qualia Hamilton Island', key: 'long_pavilion' },
        { t: '07:30', type: 'buggy', name: 'qualia → 마리나 빌리지', sub: '리조트 버기 또는 차량 약 10–15분 · 골프클럽 제티는 Manta Ray 옆', q: 'Hamilton Island Marina Village', st: 'chk', note: '컨시어지에 07:30 마리나 이동 요청.' },
        { t: '08:00 예시', type: 'ferry', name: '골프 페리 → 덴트섬', sub: '약 10분 · 예약 시 지정된 페리 · 돌아오는 배는 30분 간격', q: 'Hamilton Island Golf Club jetty, Marina Village', key: 'hamilton_island_golf' },
        { t: '08:30 예시', type: 'golf', name: 'Hamilton Island Golf Club · 18홀', sub: '약 4–4.5시간 · 2인승 버기와 왕복 페리 포함 · 클럽 렌탈 A$75–85 · 문의 07 4948 9760', addr: 'Dent Island', q: 'Hamilton Island Golf Club, Dent Island', tel: '+61 7 4948 9760', key: 'hamilton_island_golf', st: 'need', note: '티타임 예약 시 페리 시각 자동 지정. 골프 대신 힐인렛을 고르면 이 예약은 하지 않음.', cost: 'A$ 그린피 2명 약 500–600 + 렌탈' },
        { t: '13:00 전후', type: 'dining', name: '클럽하우스 점심 · 덴트 패시지 전망', sub: '라운드 후', q: 'Hamilton Island Golf Club, Dent Island', key: 'hamilton_island_golf' },
        { t: '14:30 예시', type: 'ferry', name: '페리로 해밀턴 복귀', sub: '당일 시간표 확인 · 마리나에서 리조트 차량', q: 'Hamilton Island Marina Village' },
        { t: '15:00', type: 'hotel', name: '리조트 휴식', sub: '', q: 'qualia, Hamilton Island', key: 'qualia' },
        { t: '17:00 예시', type: 'boat', opt: true, name: '선셋 크루즈 · qualia 프라이빗 모터요트 · 선택', sub: '시드니 야경 요트와 별개로 원하면 넣는 선택 일정 · 55피트 Palm Beach 모터요트, 선장과 호스트 동승 · 일몰 약 18:20 · 집결 시각은 예약 때 확정', q: 'qualia, Hamilton Island', site: 'https://www.qualia.com.au/experiences/boating/', key: 'qualia_charter', st: 'ask', note: 'qualia 컨시어지(guestservices@qualia.com.au · 07 4948 9222)에 11/19 선셋 프라이빗 차터 문의. 2명 기준 요금·소요 시간·날씨 취소 조건 확인. 대안: On the Edge 공용 선셋 세일(약 90분).', cost: 'A$ 문의 (프라이빗 차터)' },
        { t: '19:30', type: 'dining', name: 'coca chu 저녁 · 마리나 빌리지', sub: '동남아시아 요리 · 리조트 버기 약 10–15분 · 돌아올 때 컨시어지에 차량 요청', addr: 'Front St, Marina Village, Hamilton Island', q: 'coca chu Hamilton Island', key: 'coca_chu', st: 'need', note: '2명 19:30 예약 · hirestaurants@hamiltonisland.com.au' },
        { t: '대안', type: 'boat', alt: true, name: 'Explore · Hill Inlet 투어 (골프 대신)', sub: '약 4시간 · 08:00 또는 12:30 중 조수에 따라 하루 한 회차만 운영될 수 있어 날짜별 출항 확인 · 보트 이동과 전망대 걷기, 해변 시간 포함 · 오후 회차면 선셋 크루즈는 생략', q: 'Hamilton Island Marina Village', key: 'hill_inlet', note: '선택 시 골프 예약은 하지 않음. 11/19 운항 회차 확인.' },
        { t: '대안', type: 'boat', alt: true, name: 'On the Edge 선셋 세일 (공용 범선)', sub: '약 90분 · 프라이빗 차터가 어려우면 이 쪽 · 계절별 출항 시각 확인', q: 'Hamilton Island Marina Village', key: 'sunset_sail', note: '예약은 Explore Group / 해밀턴 아일랜드 투어 데스크 1300 659 133.' }
      ],
      notes: '야경 요트는 시드니 첫날로 확정 제안. 이곳 선셋 크루즈는 바다와 섬을 한 번 더 보고 싶을 때만 넣는 선택 일정이며 qualia 컨시어지가 잡아 줍니다.'
    },
    {
      id: 'd20', date: '2026-11-20', dow: '금', n: 5, city: '브리즈번', tz: 'Australia/Brisbane', tzLabel: '퀸즐랜드 시각 · 한국 +1시간',
      title: '해밀턴 아일랜드 → 브리즈번 · 강가의 저녁',
      intro: '아침은 리조트에서 느긋하게 보내고 낮 비행기로 브리즈번에 옵니다. 제임스 스트리트의 The Calile에 짐을 풀고, 해질녘에는 강을 따라 스토리브리지까지 걸어 해 지는 강을 본 뒤 Exhibition에서 마지막 저녁을 먹습니다. 다음 날 새벽 출발이라 밤 일정은 짧게 끝냅니다.',
      stay: { name: 'The Calile Hotel', sub: '48 James St, Fortitude Valley QLD 4006', tel: '+61 7 3607 5888', q: 'The Calile Hotel, 48 James Street Fortitude Valley', key: 'the_calile', nights: '1박' },
      bring: ['저녁 복장', '걷기 편한 신발', '새벽 출발용 짐 정리'],
      items: [
        { t: '07:30', type: 'dining', name: '조식 · Long Pavilion', sub: '', q: 'Long Pavilion qualia Hamilton Island', key: 'long_pavilion' },
        { t: '08:30', type: 'walk', name: '리조트 산책 · Pebble Beach', sub: '짐 정리 전 가볍게 · 일출 산 등반은 넣지 않습니다', q: 'Pebble Beach qualia Hamilton Island', key: 'pebble_beach' },
        { t: '10:30', type: 'hotel', name: '체크아웃 · 짐 보관', sub: '공항 이동 시각은 전날 컨시어지와 확정', q: 'qualia, Hamilton Island', key: 'qualia', st: 'chk', note: '항공편(VA1496 12:40) 통보 → 공항 이동 11:00 전후.' },
        { via: 'car', text: '리조트 차량 약 10–15분', mode: 'driving' },
        { t: '11:15', type: 'plane', name: '해밀턴 아일랜드 공항 · 버진 체크인', sub: '작은 공항 · 출발 60–90분 전', q: 'Hamilton Island Airport' },
        { t: '12:40', type: 'plane', name: 'VA1496 해밀턴 아일랜드 → 브리즈번', sub: '1시간 35분 · 14:15 도착 · 같은 퀸즐랜드 시각 · 보잉 737-800 · 10월 25일 이후 매일 운항 스케줄 기준', key: 'reef_view', st: 'need', note: '제안 편. 비즈니스 2석. 대안 QF1593 14:35→16:10(월·금). 발권 전 항공사 사이트에서 재확인.', cost: 'A$ 2명 비즈니스 약 900–1,200' },
        { t: '14:15', type: 'plane', name: '브리즈번 공항 국내선 도착', sub: '수하물 수령 후 차량', q: 'Brisbane Airport Domestic Terminal' },
        { via: 'car', text: '호텔까지 차량 약 20–35분', mode: 'driving' },
        { t: '15:15', type: 'hotel', name: 'The Calile 체크인 · 휴식', sub: '제임스 스트리트 한가운데 · 수영장에서 한 시간', addr: '48 James St, Fortitude Valley', q: 'The Calile Hotel, 48 James Street Fortitude Valley', tel: '+61 7 3607 5888', key: 'the_calile', st: 'ok', note: '1박. 새벽 05:10 공항 차량 호텔에 요청.' },
        { t: '16:45', type: 'walk', name: '제임스 스트리트 → 뉴팜 리버워크 → Howard Smith Wharves', sub: '강을 따라 약 30–40분 걷기 · 스토리브리지 아래에서 해 지는 강(일몰 약 18:15)과 강가 바에서 한 잔', addr: 'Howard Smith Wharves, 5 Boundary St', q: 'Howard Smith Wharves Brisbane', key: 'howard_smith_wharves', note: '브리즈번강 요트는 20일 예약이 모두 차서 뺐습니다(문의 완료). 걷기 싫으면 차량 10분.' },
        { via: 'car', text: 'Exhibition까지 차량 약 10분 (시내)', mode: 'driving' },
        { t: '19:00', type: 'dining', name: 'Exhibition 저녁 · 여행의 마지막 식사', sub: '테이스팅 메뉴 약 2–2.5시간 · 화–토 저녁 17:30부터 · 예약은 reservations@exhibitionrestaurant.com', addr: '109 Edward St, Brisbane', q: 'Exhibition Restaurant, 109 Edward Street Brisbane', key: 'exhibition_restaurant', st: 'need', note: '2명 19:00. 새벽 출발을 고려해 코스 길이 안내 받기.' },
        { via: 'car', text: '호텔까지 차량 약 10–15분', mode: 'driving' },
        { t: '21:45 전후', type: 'hotel', name: '호텔 복귀 · 짐 정리', sub: '내일 05:10 출발 · 공항 차량 재확인', q: 'The Calile Hotel, 48 James Street Fortitude Valley' }
      ],
      notes: '브리즈번강 요트는 당일 예약이 꽉 차서 제외. 요트는 시드니 첫날 야경 요트로 옮겼고, 브리즈번은 걷기와 강가 선셋, Exhibition으로 가볍게.'
    },
    {
      id: 'd21', date: '2026-11-21', dow: '토', n: 6, city: '귀국', tz: 'Australia/Brisbane', tzLabel: '퀸즐랜드 시각 · 한국 +1시간',
      title: '브리즈번 → 인천',
      intro: '08:40 출발편이라 새벽에 움직입니다. 조식은 공항 라운지에서 하고, 같은 날 저녁 인천에 닿습니다.',
      stay: { name: '인천 도착', sub: '추가 숙박 없음' },
      bring: ['여권 · 탑승권(휴대폰)', '면세품 영수증(해당 시)'],
      items: [
        { t: '05:10', type: 'car', name: 'The Calile 출발', sub: '사전 예약 차량 · 조식은 라운지에서', q: 'The Calile Hotel, 48 James Street Fortitude Valley', st: 'need', note: '호텔 통해 05:10 공항 차량 예약(골프백 2개).' },
        { via: 'car', text: '브리즈번 국제선 터미널까지 차량 약 20–35분', mode: 'driving' },
        { t: '05:40', type: 'plane', name: '브리즈번 공항 국제선 · 대한항공 체크인', sub: '출발 3시간 전 · 프레스티지 카운터 · 수하물 1인 2개 · 라운지', q: 'Brisbane Airport International Terminal', st: 'ok' },
        { t: '08:40', type: 'plane', name: 'KE408 브리즈번 → 인천', sub: '10시간 25분 · 보잉 787-9 · 프레스티지 스위트 10A · 10B', key: 'biz_class_787', st: 'ok', note: '발권·좌석 완료.' },
        { t: '18:05', type: 'plane', name: '인천공항 제2터미널 도착', sub: '같은 날 저녁 · 한국 시각', q: 'Incheon International Airport Terminal 2', tz: 'Asia/Seoul' }
      ]
    }
  ],
  flights: [
    { date: '11월 15일(일)', code: 'KE5001 · 아시아나 OZ601 운항', route: '인천 T2 → 시드니 T1', time: '20:00 → 다음 날 08:20', dur: '10시간 20분', cls: '프레스티지(비즈니스)', bag: '1인 2개', st: 'ok' },
    { date: '11월 18일(수)', code: 'VA1283 버진 오스트레일리아', route: '시드니 T2 → 해밀턴 아일랜드', time: '12:40 → 14:10 (퀸즐랜드 시각)', dur: '2시간 30분', cls: '비즈니스 · 예약 진행', bag: '위탁 수하물(골프백) 한도 확인', st: 'need', alt: '콴타스 QF578 09:40은 비즈니스 잔여석 없음' },
    { date: '11월 20일(금)', code: 'VA1496 버진 오스트레일리아', route: '해밀턴 아일랜드 → 브리즈번 국내선', time: '12:40 → 14:15', dur: '1시간 35분', cls: '비즈니스 제안', bag: '위탁 수하물 확인', st: 'need', alt: '대안 QF1593 14:35 → 16:10' },
    { date: '11월 21일(토)', code: 'KE408 대한항공', route: '브리즈번 국제선 → 인천 T2', time: '08:40 → 18:05', dur: '10시간 25분 · 787-9', cls: '프레스티지 스위트 · 10A · 10B', bag: '1인 2개', st: 'ok' }
  ],
  hotels: [
    { name: 'Capella Sydney', dates: '11월 16일(월) – 18일(수) · 2박', addr: '24 Loftus St, Sydney NSW 2000', tel: '+61 2 9071 5000', q: 'Capella Sydney, 24 Loftus Street Sydney', key: 'capella_sydney', sub: '서큘러키·오페라하우스 도보권 · 1912년 교육부 건물' },
    { name: 'qualia · Leeward Pavilion', dates: '11월 18일(수) – 20일(금) · 2박', addr: '20 Whitsunday Blvd, Hamilton Island QLD 4803', tel: '+61 7 4948 9222', q: 'qualia, Hamilton Island', key: 'qualia_leeward', sub: '섬 북쪽 끝 · 공항 픽업과 섬 안 이동은 리조트가 맡습니다 · guestservices@qualia.com.au' },
    { name: 'The Calile Hotel', dates: '11월 20일(금) – 21일(토) · 1박', addr: '48 James St, Fortitude Valley QLD 4006', tel: '+61 7 3607 5888', q: 'The Calile Hotel, 48 James Street Fortitude Valley', key: 'the_calile', sub: '제임스 스트리트 · 공항까지 차량 20–35분' }
  ],
  info: [
    { h: '시차와 해', rows: [
      ['시드니', '11월은 서머타임(UTC+11) · 한국보다 2시간 빠름 · 일출 약 05:45 · 일몰 약 19:35'],
      ['해밀턴 아일랜드 · 브리즈번', '퀸즐랜드는 서머타임 없음(UTC+10) · 한국보다 1시간 빠름 · 일출 약 05:00–05:20 · 일몰 약 18:15–18:20'],
      ['18일 비행', '시드니에서 섬으로 가면 시계를 1시간 뒤로 · 휴대폰은 자동 전환']
    ]},
    { h: '긴급 · 연락처', rows: [
      ['긴급(경찰·구급·소방)', '000'],
      ['주시드니총영사관', '+61 2 9210 0200 · 24시간 긴급 +61 403 546 058 · NSW·QLD 관할'],
      ['주브리즈번분관', '+61 7 3221 1500'],
      ['외교부 영사콜센터', '+82 2 3210 0404 (24시간)']
    ]},
    { h: '입국 · 세관', rows: [
      ['비자', '한국 여권은 ETA(601) 사전 발급 · 호주 ETA 앱'],
      ['신고', '식품·동식물·흙 묻은 신발(골프화 포함)은 신고 대상 · 깨끗이 닦아 가면 통과가 빠릅니다'],
      ['수하물', '국제선 1인 2개 · 국내선은 예약 운임의 위탁 수하물 한도 확인(골프백 포함)']
    ]},
    { h: '돈 · 전원 · 통신', rows: [
      ['결제', '카드 탭 결제가 기본 · 현금은 거의 필요 없음 · 팁은 의무가 아닙니다'],
      ['전원', '230V · I타입 플러그(한국 플러그는 어댑터 필요)'],
      ['통신', '로밍 또는 eSIM · 해밀턴 아일랜드도 4G/5G 됩니다 · 호텔 Wi-Fi 무료']
    ]},
    { h: '날씨 · 복장(11월 중순 평년)', rows: [
      ['시드니', '낮 23–26°C · 밤 15–17°C · 바람 · 가벼운 겉옷'],
      ['해밀턴 아일랜드', '낮 28–30°C · 습함 · 자외선 매우 강함 · 오후 소나기 가능'],
      ['브리즈번', '낮 27–29°C · 저녁은 가벼운 긴팔이면 충분'],
      ['벌레', '섬에서는 저녁에 모기·샌드플라이 — 기피제와 긴 소매 · 11월부터 해파리 철이라 바다 수영은 넣지 않았습니다']
    ]},
    { h: '골프', rows: [
      ['복장', '칼라 셔츠 · 긴바지 또는 테일러드 쇼츠 · 소프트 스파이크 골프화 · 청바지 불가'],
      ['NSW Golf Club', '비회원은 클럽 승인 필요 · 핸디캡 증명을 요구할 수 있습니다 · 바람 강한 링크스'],
      ['Hamilton Island Golf Club', '페리와 2인승 버기 포함 · 클럽 렌탈 A$75–85 · 운동화 가능']
    ]},
    { h: '이동', rows: [
      ['시드니 · 브리즈번', '우버·택시 · 골프백이 있는 날은 큰 차량 예약'],
      ['해밀턴 아일랜드', '일반 차 없음 · qualia 차량과 버기, 리조트 셔틀 · 공항 픽업은 리조트가 항공편 보고 배정'],
      ['걷기', '시드니 호텔에서 오페라하우스 15–20분, 더록스 15분, Spezia 3분']
    ]}
  ]
};
