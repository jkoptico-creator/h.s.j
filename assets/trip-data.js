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
  updated: '2026년 10월 29일',
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
      title: '시드니 도착 · 브리지클라임 · 오페라하우스 · 하버 나이트 크루즈',
      intro: '아침에 내려 짐을 맡기고, 호텔에서 걸어서 10분 거리의 하버브리지에 바로 오릅니다. 가이드가 다리의 역사와 시드니 이야기를 들려주는 3시간 코스입니다. 내려와서 오페라하우스 앞에서 늦은 점심을 먹고 한국어 투어로 건물 안을 본 뒤, 호텔에서 쉬었다가 18:30 요트에 오릅니다. 해 지는 하버를 배 위에서 보며 셰프의 프렌치 코스로 저녁을 먹는 날입니다.',
      stay: { name: 'Capella Sydney', sub: '24 Loftus St, Sydney NSW 2000', tel: '+61 2 9071 5000', q: 'Capella Sydney, 24 Loftus Street Sydney', key: 'capella_sydney', nights: '1/2박' },
      bring: ['운동화 · 긴바지 또는 편한 바지(클라임)', '겉옷(밤 바다 바람 · 17°C 안팎)', '선크림 · 모자', '요트에서는 신발을 벗는 곳이 많습니다'],
      items: [
        { t: '08:20', type: 'plane', name: '시드니 공항 제1터미널 도착 · OZ601', sub: '입국 심사와 수하물 수령 약 60–90분 · 식품·흙 묻은 골프화는 신고 대상이니 골프화는 깨끗이', q: 'Sydney Airport International Terminal 1', st: 'ok' },
        { via: 'car', text: '공항 → 호텔 차량 약 30–45분 (호스트 렌터카 · 골프백 2개)', mode: 'driving' },
        { t: '10:15 전후', type: 'hotel', name: 'Capella Sydney · 짐 보관', sub: '객실이 준비되기 전이면 짐만 맡기고 나섭니다 · 얼리 체크인은 호텔과 미리 조율', addr: '24 Loftus St, Sydney', q: 'Capella Sydney, 24 Loftus Street Sydney', tel: '+61 2 9071 5000', key: 'capella_sydney', st: 'ok', note: '얼리 체크인 요청함(보장 체크인 15:00). 호텔 주차(대리주차·요금) 문의함.' },
        { via: 'walk', text: 'BridgeClimb 집결지까지 도보 약 10분 (더록스)', mode: 'walking' },
        { t: '11:00–12:00 출발', type: 'pin', name: 'BridgeClimb · Summit Climb', sub: '하버브리지 꼭대기 아치까지 · 총 약 3시간 · 정확한 출발 시각은 예약 뒤 이메일로 옵니다 · 출발 전 음주 불가 · 휴대폰·카메라는 보관함에 맡기고, 사진은 가이드가 찍어 줍니다', addr: '3 Cumberland St, The Rocks', q: 'BridgeClimb Sydney, 3 Cumberland Street The Rocks', tel: '+61 2 8274 7777', key: 'bridgeclimb', st: 'need', note: '11/16(월) 2명 11–12시 출발 회차 예약 가능 확인(10/29). 18일 아침은 8–9시 매진이라 비행기 시간과 안 맞고, 17일은 골프 때문에 저녁 회차만 남아 16일로 옮김. 입국이 늦어지면 12–13시 회차로 바꾸고 오페라하우스 투어는 생략.' },
        { via: 'walk', text: '더록스 → 호텔 도보 약 10분', mode: 'walking' },
        { t: '14:30', type: 'dining', name: '애프터눈 티 · Aperture (Capella Sydney)', sub: '호텔 안 · 샴페인과 함께 · 클라임 뒤 호텔로 걸어와 쉬면서 · 도보 약 10분', addr: '24 Loftus St, Sydney', q: 'Capella Sydney, 24 Loftus Street Sydney', key: 'capella_sydney', st: 'ok', note: '11/16 14:30 2명 예약 완료(Capella Sojourn 패키지 포함). 식이 제한 없음 회신.' },
        { t: '15:30', type: 'pin', opt: true, name: '오페라하우스 한국어 투어 집결 · 15:45 시작', sub: '약 30분 · 계단 200개 정도 · 집결은 하부 콘코스의 Welcome Centre · 문의 02 8188 3734', addr: 'Bennelong Point, Sydney', q: 'Sydney Opera House Welcome Centre', tel: '+61 2 8188 3734', key: 'opera_house_tour', st: 'need', note: '한국어 투어는 매일 운영. 애프터눈 티가 길어지면 생략(17일 Bennelong에서 건물 안을 봄). 가려면 15:25 호텔 출발.' },
        { via: 'walk', text: '호텔까지 도보 약 15분', mode: 'walking' },
        { t: '16:30', type: 'hotel', name: '체크인 · 자유 시간', sub: '두 분이 쉬거나 호텔 주변을 걷는 시간 · 요트 전에 샤워하고 옷 갈아입기', q: 'Capella Sydney, 24 Loftus Street Sydney', key: 'capella_sydney' },
        { via: 'walk', text: '승선 선착장까지 도보 또는 차량 (확정 후 안내)', mode: 'walking' },
        { t: '18:30', type: 'boat', name: 'Empress · 하버 나이트 크루즈 · 선상 프렌치 디너', sub: '77피트 모터요트 전세 · 4명(첫날 저녁 일행 1명 합류) · 승선 18:15 · 일몰 약 19:36 · 하버브리지 아래, 오페라하우스 앞, 시티 불빛 · 셰프 Pierre Gaudin(Noranise)의 카나페와 디그스테이션 코스 · 22:30 하선', q: 'Circular Quay Sydney', key: 'harbour_yacht', st: 'ask', note: '10/28 Empress로 결정. SHS(Daniel)에 확정 요청: ① 스피릿 위주 럭셔리 패키지 대신 코스별 와인 페어링(풀바디 레드 선호, 가격보다 음식 궁합) ② 승선 선착장 ③ 일행 1명의 음주 여부에 맞춰 음료 인원 조정. 디저트 전 30분은 두 분이 플라이브리지에서 따로 야경을 보도록 크루에게 부탁.' },
        { via: 'car', text: '하선 뒤 호텔까지 차량 약 5–10분', mode: 'driving' },
        { t: '22:45 전후', type: 'hotel', name: '호텔 복귀', sub: '내일 06:55 출발 · 골프 가방과 골프복은 차에 실어 둡니다', q: 'Capella Sydney, 24 Loftus Street Sydney' },
        { t: '대안', type: 'hotel', alt: true, name: '클라임 대신 휴식', sub: '밤 비행기로 피곤하면 클라임을 빼고 호텔에서 쉬다가 오페라하우스 투어와 요트만 갑니다', q: 'Capella Sydney, 24 Loftus Street Sydney', key: 'capella_sydney', note: '클라임은 예약 뒤 변경·취소 규정 확인.' }
      ],
      notes: '흐름: 10:15 호텔 → 11–12시 클라임 → 14:30 Aperture 애프터눈 티 → (선택) 15:45 투어 → 16:30 자유 시간 → 18:30 Empress → 22:45 호텔. Bennelong은 이날 빼고 17일 저녁으로 옮김. 요트는 4명이지만 대화가 계속 이어지는 자리이니 두 분만의 시간을 따로 만들어 드릴 것.'
    },
    {
      id: 'd17', date: '2026-11-17', dow: '화', n: 2, city: '시드니', tz: 'Australia/Sydney', tzLabel: '시드니 시각 · 한국 +2시간',
      title: '해안 산책 · 세인트 마이클 골프 · 스파 · Bennelong',
      intro: '아침에 본다이에서 쿠지까지 6km 해안 절벽길을 두 시간 정도 걷습니다. 쿠지 해변 앞에서 브런치를 먹고, 차로 15분 거리의 세인트 마이클 골프클럽에서 11:40에 18홀을 칩니다. 바다를 끼고 도는 코스입니다. 돌아와서 호텔 스파에서 90분 마사지를 받고, 저녁은 오페라하우스 안의 Bennelong에서 와인과 함께 천천히 먹습니다.',
      stay: { name: 'Capella Sydney', sub: '24 Loftus St, Sydney NSW 2000', tel: '+61 2 9071 5000', q: 'Capella Sydney, 24 Loftus Street Sydney', key: 'capella_sydney', nights: '2/2박' },
      bring: ['걷기 편한 운동화 · 모자 · 선크림', '골프복 · 골프화 · 장갑(차에 실어 두고 클럽에서 갈아입기)', '물 한 병', 'Bennelong은 스마트 캐주얼'],
      items: [
        { t: '06:30', type: 'dining', name: '가벼운 조식 · 룸서비스 또는 커피', sub: '산책 전 간단히 · 브런치는 쿠지에서', q: 'Capella Sydney, 24 Loftus Street Sydney' },
        { t: '06:55', type: 'car', name: '호텔 출발 · 호스트 차량', sub: '골프 가방은 차에 그대로 · 본다이에 내려 드리고 차는 쿠지에서 기다립니다', q: 'Capella Sydney, 24 Loftus Street Sydney', note: '렌터카(호스트 운전): 06:55 호텔 → 본다이 하차 → 쿠지 주차 → 10:40 출발 → 세인트 마이클 → 16:30 출발 → 17:15 호텔. 골프백 3개.' },
        { via: 'car', text: '본다이까지 차량 약 25–35분', mode: 'driving' },
        { t: '07:30', type: 'walk', name: '본다이 → 쿠지 해안 산책 · 약 6km', sub: '타마라마, 브론테, 클로벨리, 고든스 베이를 지나 쿠지까지 · 사진·휴식 포함 약 2시간 · 포장길과 가파른 계단이 섞여 있습니다 · 화장실과 식수대는 본다이·브론테·쿠지에', q: 'Bondi to Coogee Coastal Walk', key: 'bondi_coogee' },
        { t: '09:45', type: 'dining', name: '쿠지 해변 브런치 · Coogee Pavilion', sub: '바다 앞 · 걷고 난 뒤 든든하게 · 평일 아침 운영 시간 확인', addr: '169 Dolphin St, Coogee', q: 'Coogee Pavilion, 169 Dolphin Street Coogee', key: 'coogee_pavilion', st: 'need', note: '3명 09:45 예약 또는 워크인. 평일 조식 시작 시각 확인.' },
        { via: 'car', text: '쿠지 → 리틀 베이 차량 약 15분', mode: 'driving' },
        { t: '11:00', type: 'golf', name: '세인트 마이클 골프클럽 도착 · 수속', sub: '티타임 40분 전 · 라커룸에서 갈아입기 · 드레스코드가 엄격합니다: 칼라 셔츠, 긴바지 또는 테일러드 쇼츠, 골프화', addr: 'Jennifer St, Little Bay NSW 2035', q: "St Michael's Golf Club, Little Bay", tel: '+61 2 9326 8000', st: 'need', note: '11:40 3명 확정(클럽에서 이 시간이 최선이라고 답함). 카트 A$50.' },
        { t: '11:40', type: 'golf', name: '세인트 마이클 · 18홀 · 티타임 11:40', sub: '약 4–4.5시간 · 바닷가를 따라 도는 파72 · 홀마다 바다 쪽 바람을 봐야 합니다', q: "St Michael's Golf Club, Little Bay", st: 'need' },
        { t: '16:15 전후', type: 'car', name: '라운드 후 바로 출발', sub: '16:30까지 출발해야 스파 시간에 맞습니다', q: "St Michael's Golf Club, Little Bay" },
        { via: 'car', text: '리틀 베이 → 호텔 차량 약 35–45분 (오후 교통)', mode: 'driving' },
        { t: '17:30', type: 'spa', name: 'Auriga Spa · Connect to Country 90분 · 2인', sub: '호텔 안 스파 · 골프 뒤 바로 · 15분 전 도착 · 끝나면 19:00', q: 'Capella Sydney, 24 Loftus Street Sydney', tel: '+61 2 9071 5010', key: 'capella_sydney', st: 'ask', note: 'Capella Sojourn 패키지 포함. 11/17 17:30 커플 룸 요청함, 호텔 확정 대기.' },
        { via: 'walk', text: '오페라하우스까지 도보 약 15–20분 (서큘러키 물가)', mode: 'walking' },
        { t: '19:45', type: 'dining', name: 'Bennelong 저녁 · 오페라하우스 안', sub: '오페라하우스 돛 아래의 레스토랑 · 매일 저녁 운영 · 소믈리에에게 코스에 맞는 와인을 맡기기 좋은 곳 · 문의 02 9240 8000', addr: 'Sydney Opera House, Bennelong Point', q: 'Bennelong Restaurant Sydney Opera House', tel: '+61 2 9240 8000', key: 'bennelong', st: 'need', note: '2명(두 분) 19:45 · 호텔 컨시어지에 예약 요청함 · 창가 · 와인 페어링 또는 소믈리에 추천(풀바디 레드 선호) 미리 알리기. 호스트는 근처에서 대기.' },
        { via: 'walk', text: '호텔까지 서큘러키 물가를 따라 도보 약 15분', mode: 'walking' },
        { t: '22:15 전후', type: 'hotel', name: '호텔 복귀', sub: '내일 아침은 느긋하게 · 10:30 체크아웃', q: 'Capella Sydney, 24 Loftus Street Sydney' },
        { t: '대안', type: 'car', alt: true, name: '산책을 짧게 · 본다이 → 브론테 2.5km', sub: '전날 피곤하면 1시간만 걷고 브론테에서 차를 타고 쿠지로', q: 'Bondi to Bronte Coastal Walk', key: 'bondi_coogee' }
      ],
      notes: '세인트 마이클은 11:40이 가장 이른 시간(클럽 답변). NSW Golf Club은 비회원 승인 문제로 제외. 오후 골프 때문에 Spezia 17:00과 이 날의 클라임은 빼고, 클라임은 16일로 옮김.'
    },
    {
      id: 'd18', date: '2026-11-18', dow: '수', n: 3, city: '해밀턴 아일랜드', short: '해밀턴', tz: 'Australia/Brisbane', tzLabel: '오전은 시드니 시각 · 도착 뒤 퀸즐랜드 시각(시드니 −1시간 · 한국 +1시간)',
      title: '시드니 → 해밀턴 아일랜드 · 스위트 체크인 · 원트리힐 선셋',
      intro: '아침은 느긋하게, 원하면 호텔 옆 왕립 식물원을 걸어 미세스 매쿼리 체어에서 하버를 한 번 더 봅니다. 낮 비행기(버진 VA1283 12:40)로 섬에 건너가면 시계를 한 시간 뒤로 돌립니다. Reef View Hotel의 2층 스위트(전용 플런지 풀)에 짐을 풀고, 해 질 녘 원트리힐에서 휘트선데이 일몰을 본 뒤 요트클럽의 Bommie에서 두 분이 저녁을 먹습니다.',
      stay: { name: 'Reef View Hotel · Superior Presidential Suite', sub: '12 Resort Drive, Hamilton Island QLD 4803 · 침실 2 · 욕실 2 · 전용 플런지 풀 테라스', tel: '+61 7 4946 9999', q: 'Reef View Hotel, Hamilton Island', key: 'reef_view_suite', nights: '1/2박' },
      bring: ['모기 기피제(저녁)', '샌들 · 선글라스', '플런지 풀용 옷', 'Bommie는 스마트 캐주얼'],
      items: [
        { t: '08:00', type: 'dining', name: '조식 · 느긋한 아침', sub: '짐 정리', q: 'Capella Sydney, 24 Loftus Street Sydney', tz: 'Australia/Sydney' },
        { t: '09:00', type: 'walk', opt: true, name: '왕립 식물원 · 미세스 매쿼리 체어 산책', sub: '호텔에서 걸어서 5분 · 오페라하우스와 하버브리지가 한 장에 담기는 전망 · 한 시간 안팎', q: 'Mrs Macquaries Chair Sydney', key: 'mrs_macquaries', tz: 'Australia/Sydney' },
        { t: '10:30', type: 'hotel', name: '체크아웃', sub: '미니바·세탁 정산', q: 'Capella Sydney, 24 Loftus Street Sydney', tz: 'Australia/Sydney' },
        { t: '10:45', type: 'car', name: '호텔 출발', sub: '국내선 제2터미널(버진 오스트레일리아)로', q: 'Capella Sydney, 24 Loftus Street Sydney', tz: 'Australia/Sydney', note: '호스트 렌터카로 이동(골프백).' },
        { via: 'car', text: '시드니 국내선 T2까지 차량 약 30–45분', mode: 'driving' },
        { t: '11:25', type: 'plane', name: '시드니 공항 제2터미널 · 버진 체크인', sub: '출발 75분 전 · 비즈니스 라운지', q: 'Sydney Airport Terminal 2 Domestic', tz: 'Australia/Sydney' },
        { t: '12:40', type: 'plane', name: 'VA1283 시드니 → 해밀턴 아일랜드', sub: '2시간 30분 · 14:10 도착(퀸즐랜드 시각) · 보잉 737-800 비즈니스 · 기내식 점심', key: 'reef_view', tz: 'Australia/Sydney', st: 'ok', note: '예약 완료(버진 비즈니스). 출발 전 좌석 지정·골프백 위탁 신고.' },
        { t: '14:10', type: 'plane', name: '해밀턴 아일랜드 공항 도착', sub: '퀸즐랜드 시각 · 수하물 수령 후 스위트 전용 VIP 차량(호텔에 항공편 등록됨)', q: 'Hamilton Island Airport', st: 'ok', note: '호텔 예약에 VA1283 14:10 도착이 등록되어 있음. VIP 전용 차량이 안 보이면 리조트 셔틀(포함).' },
        { via: 'car', text: '공항 → Reef View Hotel 전용 차량 약 5–10분', mode: 'driving' },
        { t: '14:30', type: 'hotel', name: 'Reef View Hotel 체크인 · Superior Presidential Suite', sub: '체크인 14:00 · 스위트 컨시어지 데스크 · 2층 구조: 아래층 거실·다이닝·테라스 플런지 풀, 위층 침실 2·욕실 2 · 캣츠아이 비치 전망 · 4인승 버기 포함(키 수령)', addr: '12 Resort Drive, Hamilton Island', q: 'Reef View Hotel, Hamilton Island', tel: '+61 7 4946 9999', key: 'reef_view_suite', st: 'ok', note: '2박 · 세이버 요금(조식 포함). 포함: VIP 공항 왕복, 4인승 버기, 무알코올 미니바(매일 보충), 카타마란·카약·SUP·스노클 장비, 아일랜드 셔틀, 피트니스·사우나·테니스. 대여 버기는 따로 있으니 스위트 버기는 두 분 전용.' },
        { t: '15:15', type: 'pin', name: '자유 시간 · 플런지 풀 · 캣츠아이 비치', sub: '두 분이 쉬거나 비치를 걷는 시간 · 카타마란·카약은 비치 스포츠 데스크에서 무료', q: 'Catseye Beach Hamilton Island', key: 'catseye_beach' },
        { via: 'buggy', text: '원트리힐까지 버기 약 5분 (언덕길)', mode: 'driving' },
        { t: '17:30', type: 'pin', name: '원트리힐 선셋 · 칵테일', sub: '섬에서 가장 유명한 일몰 전망대 · 바는 14:00–일몰, 마르가리타 밴 15:00–19:00 · 일몰 약 18:20', q: 'One Tree Hill Lookout Hamilton Island', key: 'one_tree_hill' },
        { via: 'buggy', text: '원트리힐 → 마리나 요트클럽 버기 약 10분 · 야간 운전은 천천히', mode: 'driving' },
        { t: '19:00', type: 'dining', name: 'Bommie 저녁 · 해밀턴 아일랜드 요트클럽', sub: '셰프 햇 · 3코스 또는 디거스테이션 · 스마트 캐주얼 · 덴트 패시지 전망', addr: 'Hamilton Island Yacht Club, Front St', q: 'Bommie Restaurant Hamilton Island Yacht Club', key: 'bommie', st: 'ok', note: '2명 19:00 예약 완료(SevenRooms). 창가 요청 + 와인 페어링(풀바디 레드 선호)을 미리 메모로 남기기. 호스트는 주문 뒤 자리를 비움.' },
        { via: 'buggy', text: '호텔까지 버기 약 10분 또는 그린 셔틀(22:45까지, 10–12분 간격)', mode: 'driving' },
        { t: '21:30 전후', type: 'hotel', name: '호텔 복귀', sub: '내일 골프 · 06:15 조식', q: 'Reef View Hotel, Hamilton Island' }
      ],
      notes: 'qualia 예약이 안 되어 Reef View Hotel 스위트로 변경. 스파는 골프 뒤 19일 오후로 옮김. 스위트에 4인승 버기가 포함되므로 별도 대여 버기는 호스트용(픽업 14:15 · 반납 20일 12:45 예약이지만 11:00 전후 반납).'
    },
    {
      id: 'd19', date: '2026-11-19', dow: '목', n: 4, city: '해밀턴 아일랜드', short: '해밀턴', tz: 'Australia/Brisbane', tzLabel: '퀸즐랜드 시각 · 한국 +1시간',
      title: '덴트섬 골프 08:30 · 커플 스파 · Catseye Pool Club',
      intro: '아침 페리로 덴트섬에 건너가 Hamilton Island Golf Club 18홀을 돕니다(티타임 08:30). 라운드 뒤 클럽하우스에서 점심을 먹고 돌아와, 오후에는 두 분이 스파에서 마사지를 받습니다. 저녁은 걸어서 갈 수 있는 The Sundays의 Catseye Pool Club입니다.',
      stay: { name: 'Reef View Hotel · Superior Presidential Suite', sub: '12 Resort Drive, Hamilton Island QLD 4803 · 침실 2 · 욕실 2 · 전용 플런지 풀 테라스', tel: '+61 7 4946 9999', q: 'Reef View Hotel, Hamilton Island', key: 'reef_view_suite', nights: '2/2박' },
      bring: ['골프복 · 골프화 · 장갑', '모자 · 선크림(자외선 매우 강함)', '모기 기피제', '저녁용 얇은 겉옷'],
      items: [
        { t: '06:15', type: 'dining', name: '조식 · Pool Terrace', sub: '호텔 수영장 옆 · 조식 06:00부터(포함) · Sails는 07:00부터', q: 'Pool Terrace Restaurant Reef View Hotel Hamilton Island', key: 'reef_view_suite' },
        { via: 'buggy', text: '호텔 → 마리나 버기 약 10분 · 골프클럽 제티(Manta Ray 옆)에 주차', mode: 'driving' },
        { t: '07:40', type: 'ferry', name: '골프클럽 제티 도착 · 페리 대기', sub: '예약 확인서의 페리 시각 15분 전 · 마리나 빌리지 Manta Ray 옆', q: 'Hamilton Island Golf Club jetty, Marina Village', key: 'hamilton_island_golf', st: 'chk', note: '페리 시각은 티타임 예약 확인서 기준(보통 티타임 30분 전).' },
        { t: '08:00', type: 'ferry', name: '골프 페리 → 덴트섬', sub: '약 10분 · 돌아오는 배는 30분 간격', q: 'Hamilton Island Golf Club jetty, Marina Village', key: 'hamilton_island_golf' },
        { t: '08:30', type: 'golf', name: 'Hamilton Island Golf Club · 18홀 · 티타임 08:30', sub: '약 4–4.5시간 · 버기와 왕복 페리 포함 · 클럽 렌탈 A$75–85 · 문의 07 4948 9760', addr: 'Dent Island', q: 'Hamilton Island Golf Club, Dent Island', tel: '+61 7 4948 9760', key: 'hamilton_island_golf', st: 'ok', note: '티타임 08:30 예약 완료(3명 · 18홀). 클럽 렌탈 필요 여부 확인.' },
        { t: '13:00 전후', type: 'dining', name: '클럽하우스 점심 · 덴트 패시지 전망', sub: '라운드 후', q: 'Hamilton Island Golf Club, Dent Island', key: 'hamilton_island_golf' },
        { t: '14:30 예시', type: 'ferry', name: '페리로 해밀턴 복귀', sub: '당일 시간표 확인 · 마리나에서 버기', q: 'Hamilton Island Marina Village' },
        { t: '15:30', type: 'spa', opt: true, name: 'Spa wumurdaylin · 커플 트리트먼트', sub: '골프 뒤 마사지 · 60–90분 · 리조트 센터 옆, 호텔에서 도보 5분 · 월–토 09:00–18:00 · 15분 전 도착', q: 'Spa wumurdaylin Hamilton Island', key: 'spa_wumurdaylin', st: 'need', note: '2명 15:30 커플 룸 요청(웹 요청 양식). 페리 시간 때문에 15:30보다 앞당기지 않기.' },
        { t: '17:15', type: 'hotel', name: '자유 시간 · 플런지 풀', sub: '두 분이 쉬는 시간 · 테라스에서 해 지는 것 보기(일몰 약 18:20)', q: 'Reef View Hotel, Hamilton Island', key: 'reef_view_suite' },
        { via: 'walk', text: 'Catseye Pool Club까지 도보 약 5–10분 (리조트 드라이브 · 비치 쪽)', mode: 'walking' },
        { t: '19:00', type: 'dining', name: 'Catseye Pool Club 저녁 · The Sundays', sub: '조시·줄리 닐런드(시드니 Saint Peter) 메뉴 · 셰어 스타일 · 캣츠아이 베이 물가 · 저녁 17:00–21:00 · 셰프 햇', addr: 'The Sundays, Catseye Beach', q: 'Catseye Pool Club The Sundays Hamilton Island', key: 'catseye_pool_club', st: 'need', note: '사전 예약(SevenRooms) · 2명 19:00 · 물가 테이블 요청 · 해산물 메뉴에 맞춘 와인 추천 요청. 대안: coca chu 또는 Romano\'s(마리나).' },
        { t: '21:00 전후', type: 'hotel', name: '호텔 복귀 · 도보', sub: '내일 10:00 체크아웃', q: 'Reef View Hotel, Hamilton Island' },
        { t: '대안', type: 'boat', alt: true, name: '스파 대신 선셋 크루즈', sub: '바다에서 해 지는 것을 보고 싶을 때 · 프라이빗 차터(Palm Beach 55피트) 또는 On the Edge 공용 선셋 세일(약 90분) · 17:00 마리나 출항', q: 'Hamilton Island Marina Village', key: 'sunset_sail', st: 'ask', note: '해밀턴 아일랜드 투어 데스크 1300 659 133. 16일에 요트를 탔으니 기본안은 스파.' }
      ],
      notes: '골프 → 마사지 → 와인 저녁 순서로, 두 분이 평소 즐기는 하루 흐름에 맞춤. 저녁은 호텔에서 걸어가는 Catseye Pool Club으로 두어 버기 야간 운전을 피함.'
    },
    {
      id: 'd20', date: '2026-11-20', dow: '금', n: 5, city: '브리즈번', tz: 'Australia/Brisbane', tzLabel: '퀸즐랜드 시각 · 한국 +1시간',
      title: '해밀턴 아일랜드 → 브리즈번 · 브루어리 산책 · Exhibition · 강변 야경',
      intro: '아침은 비치프런트 조식과 캣츠아이 비치 산책으로 느긋하게 보내고 낮 비행기로 브리즈번에 옵니다. 제임스 스트리트의 The Calile에 짐을 푼 뒤, 오래된 양모 창고가 늘어선 테네리프 강변 동네를 걸어 브루어리에서 한 잔 하고, 18시에 Exhibition에서 마지막 저녁을 먹습니다. 원하면 식사 뒤 스토리브리지 아래 강변을 걸어 Howard Smith Wharves까지 갑니다. 다음 날 새벽 출발이라 밤 일정은 22시 전에 끝냅니다.',
      stay: { name: 'The Calile Hotel', sub: '48 James St, Fortitude Valley QLD 4006', tel: '+61 7 3607 5888', q: 'The Calile Hotel, 48 James Street Fortitude Valley', key: 'the_calile', nights: '1박' },
      bring: ['저녁 복장', '걷기 편한 신발', '새벽 출발용 짐 정리'],
      items: [
        { t: '07:30', type: 'dining', name: '조식 · Sails · 비치프런트', sub: '캣츠아이 비치 앞 · 조식 07:00–10:30(포함)', q: 'Sails Restaurant Hamilton Island', key: 'sails_hi' },
        { t: '08:30', type: 'walk', name: '캣츠아이 비치 산책 · 카약 또는 SUP(선택)', sub: '짐 정리 전 가볍게 · 비치 스포츠 장비 무료', q: 'Catseye Beach Hamilton Island', key: 'catseye_beach' },
        { t: '10:00', type: 'hotel', name: '체크아웃 · 짐 보관 · 스위트 버기 반납', sub: '체크아웃 10:00 · 공항 VIP 차량 시각은 스위트 컨시어지와 확정', q: 'Reef View Hotel, Hamilton Island', key: 'reef_view_suite', st: 'chk', note: '호텔 예약에 VA1496 12:40 출발 등록됨 → 공항 이동 11:15 전후. 대여 버기는 11:00까지 반납(예약상 12:45).' },
        { t: '10:15', type: 'shop', opt: true, name: '리조트 센터 · 커피와 가게들', sub: '호텔 옆 · 출발 전 한 시간', q: 'Resort Centre Hamilton Island', key: 'reef_view' },
        { via: 'car', text: '호텔 → 공항 VIP 전용 차량 약 5–10분', mode: 'driving' },
        { t: '11:15', type: 'plane', name: '해밀턴 아일랜드 공항 · 버진 체크인', sub: '작은 공항 · 출발 60–90분 전', q: 'Hamilton Island Airport' },
        { t: '12:40', type: 'plane', name: 'VA1496 해밀턴 아일랜드 → 브리즈번', sub: '1시간 35분 · 14:15 도착 · 같은 퀸즐랜드 시각 · 보잉 737-800', key: 'reef_view', st: 'ok', note: '예약 완료(버진). 출발 전 좌석 지정·골프백 위탁 신고.' },
        { t: '14:15', type: 'plane', name: '브리즈번 공항 국내선 도착', sub: '수하물 수령 후 차량', q: 'Brisbane Airport Domestic Terminal' },
        { via: 'car', text: '호텔까지 차량 약 20–35분', mode: 'driving' },
        { t: '15:15', type: 'hotel', name: 'The Calile 체크인 · 휴식', sub: '제임스 스트리트 한가운데 · 수영장에서 잠깐', addr: '48 James St, Fortitude Valley', q: 'The Calile Hotel, 48 James Street Fortitude Valley', tel: '+61 7 3607 5888', key: 'the_calile', st: 'ok', note: '1박. 새벽 05:10 공항 차량 호텔에 요청.' },
        { via: 'walk', text: '제임스 스트리트 → 뉴스테드 → 테네리프 도보 약 20–25분', mode: 'walking' },
        { t: '16:15', type: 'walk', opt: true, name: '테네리프 브루어리 산책 · Green Beacon Brewing', sub: '제임스 스트리트 가게들을 지나 붉은 벽돌 양모 창고가 늘어선 강변 동네까지 걷고, 양조장 탭룸에서 시음 패들 한 판 · 금요일 11:00부터 운영', addr: '26 Helen St, Teneriffe', q: 'Green Beacon Brewing Co, 26 Helen Street Teneriffe', st: 'chk', note: '저녁 테이스팅 전이라 한 판만. 금요일 오후 운영 확인.' },
        { via: 'car', text: '테네리프 → Exhibition 차량 약 10–15분', mode: 'driving' },
        { t: '18:00', type: 'dining', name: 'Exhibition 저녁 · 여행의 마지막 식사', sub: '테이스팅 메뉴 약 2–2.5시간 · 지하 2층(Basement 2) · 18:00 예약 완료', addr: 'Basement 2, 109 Edward St, Brisbane', q: 'Exhibition Restaurant, 109 Edward Street Brisbane', key: 'exhibition_restaurant', st: 'ok', note: '18:00 예약 완료(18시 회차만 가능). 3명. 와인 페어링(풀바디 레드 선호) 미리 알리기.' },
        { via: 'walk', text: 'Edward St → 이글 스트리트 피어 → 스토리브리지 아래 리버워크 → Howard Smith Wharves 도보 약 25–30분', mode: 'walking' },
        { t: '20:45', type: 'walk', opt: true, name: '브리즈번강 야경 산책 · 리버워크와 스토리브리지', sub: '식사 뒤 강을 따라 불 켜진 스토리브리지 아래를 걸어 Howard Smith Wharves까지 · 브루어리 Felons Barrel Hall이나 강가 바에서 한 잔 · 피곤하면 차량으로 바로 호텔', addr: 'Howard Smith Wharves, 5 Boundary St', q: 'Howard Smith Wharves Brisbane', key: 'howard_smith_wharves', note: '브리즈번강 요트는 20일 예약이 모두 차서 뺐습니다(문의 완료).' },
        { via: 'car', text: '호텔까지 차량 약 10분', mode: 'driving' },
        { t: '22:00 전후', type: 'hotel', name: '호텔 복귀 · 짐 정리', sub: '내일 05:10 출발 · 공항 차량 재확인', q: 'The Calile Hotel, 48 James Street Fortitude Valley' }
      ],
      notes: '하루 연장 검토 중(두 분 상의). 연장하면 21일에 Sirromet 와이너리(마운트 코튼, 시내에서 차로 약 40분 · 45분 투어와 6종 시음 · 레스토랑 Lurleen\'s 점심)를 넣고 22일 귀국. 대한항공 22일 프레스티지 좌석 먼저 확인.'
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
    { date: '11월 18일(수)', code: 'VA1283 버진 오스트레일리아', route: '시드니 T2 → 해밀턴 아일랜드', time: '12:40 → 14:10 (퀸즐랜드 시각)', dur: '2시간 30분 · 737-800', cls: '비즈니스', bag: '위탁 수하물에 골프백 포함 · 출발 전 좌석 지정', st: 'ok' },
    { date: '11월 20일(금)', code: 'VA1496 버진 오스트레일리아', route: '해밀턴 아일랜드 → 브리즈번 국내선', time: '12:40 → 14:15', dur: '1시간 35분 · 737-800', cls: '예약 완료', bag: '위탁 수하물에 골프백 포함 · 출발 전 좌석 지정', st: 'ok' },
    { date: '11월 21일(토)', code: 'KE408 대한항공', route: '브리즈번 국제선 → 인천 T2', time: '08:40 → 18:05', dur: '10시간 25분 · 787-9', cls: '프레스티지 스위트 · 10A · 10B', bag: '1인 2개', st: 'ok' }
  ],
  hotels: [
    { name: 'Capella Sydney', dates: '11월 16일(월) – 18일(수) · 2박', addr: '24 Loftus St, Sydney NSW 2000', tel: '+61 2 9071 5000', q: 'Capella Sydney, 24 Loftus Street Sydney', key: 'capella_sydney', sub: '서큘러키·오페라하우스 도보권 · 1912년 교육부 건물' },
    { name: 'Reef View Hotel · Superior Presidential Suite', dates: '11월 18일(수) 14:00 – 20일(금) 10:00 · 2박', addr: '12 Resort Drive, Hamilton Island QLD 4803', tel: '+61 7 4946 9999', q: 'Reef View Hotel, Hamilton Island', key: 'reef_view_suite', sub: '캣츠아이 비치 앞 · 2층 스위트(침실 2·욕실 2·전용 플런지 풀) · 조식 포함(Sails 또는 Pool Terrace) · 공항 왕복 VIP 차량 · 4인승 버기 · 무알코올 미니바 · 비치 스포츠 장비 · 예약 1800 370 800' },
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
      ['벌레 · 바다', '섬에서는 저녁에 모기·샌드플라이 — 기피제와 긴 소매 · 11월부터 해파리 철이라 바다 수영은 넣지 않았고, 수영은 스위트 플런지 풀과 호텔 풀에서']
    ]},
    { h: '골프', rows: [
      ['복장', '칼라 셔츠 · 긴바지 또는 테일러드 쇼츠 · 소프트 스파이크 골프화 · 청바지 불가'],
      ['세인트 마이클', '11/17 11:40 티타임 · 드레스코드가 엄격합니다 · 카트 A$50 · 바닷가 파72'],
      ['Hamilton Island Golf Club', '11/19 08:30 티타임 예약 완료 · 페리와 버기 포함 · 클럽 렌탈 A$75–85 · 운동화 가능']
    ]},
    { h: '이동', rows: [
      ['시드니 · 브리즈번', '우버·택시 · 골프백이 있는 날은 큰 차량 예약'],
      ['해밀턴 아일랜드', '일반 차 없음 · 스위트에 포함된 4인승 버기(야간 운전은 천천히, 충전 6시간) · 무료 아일랜드 셔틀: 그린 라인 리조트 센터↔마리나 10–12분 간격 07:00–22:45, 블루 라인 섬 전체 40분 순환 · 공항 왕복은 스위트 VIP 차량'],
      ['걷기', '시드니 호텔에서 오페라하우스 15–20분, 브리지클라임(더록스) 10분 · 해밀턴에서는 호텔 → Catseye Pool Club 5–10분, 리조트 센터 3분']
    ]}
  ]
};
