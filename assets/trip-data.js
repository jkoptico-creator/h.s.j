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
  dates: '2026년 11월 15일(일) – 22일(일)',
  updated: '2026년 11월 12일',
  wxNote: '날씨는 11월 12일 기준 예보입니다. 출발 전에 다시 확인하세요.',
  lookbook: 'plan-2-sydney-hamilton-brisbane.html',
  days: [
    {
      id: 'd15', cover: 'biz_class_a380', coverCap: '아시아나 비즈니스 클래스', date: '2026-11-15', dow: '일', n: 0, city: '인천', tz: 'Asia/Seoul', tzLabel: '한국 시각',
      title: '인천 출발',
      intro: '저녁 비행기입니다. 출발 3시간 전에 공항에 닿도록 움직이고 기내에서 잠을 자 두면 시드니 아침 일정이 편합니다.',
      stay: { name: '기내', sub: '아시아나 프레스티지 · 시드니행 야간 비행' },
      bring: ['여권 · 호주 ETA(출발 전 앱에서 승인 확인)', '휴대폰 · 충전기 · 보조배터리(기내 가방에만)', '기내용 편한 옷 · 얇은 겉옷(기내와 시드니 아침 15°C)', '평소 먹는 약 · 멀미약은 기내 가방에', '골프화 바닥 흙 털기(호주 입국 신고 대상)', '전체 짐 목록은 정보 탭 체크리스트에'],
      pack: [
        { t: '서류 · 결제', items: ['여권(유효기간 6개월 이상)', '호주 ETA(전자여행허가) 발급 확인', '해외 결제 카드(비자·마스터)', '로밍 또는 eSIM'] },
        { t: '전자기기', items: ['휴대폰 충전기', '멀티 어댑터(호주 I타입)', '보조배터리(기내 반입만 가능)'] },
        { t: '시드니 옷 (15–23°C)', items: ['가벼운 재킷이나 가디건', '긴바지 · 긴팔'] },
        { t: '해밀턴 · 브리즈번 옷 (25–29°C · 습함)', items: ['린넨 셔츠 · 원피스 같은 여름옷', '반바지 · 샌들', '수영복(스위트 플런지 풀)'] },
        { t: '저녁 자리 (요트 · Bennelong · Exhibition · SUUM)', items: ['스마트 캐주얼 2–3벌(남: 칼라 셔츠·슬랙스 / 여: 원피스)', '굽 낮은 구두나 로퍼(요트는 하이힐 불가)'] },
        { t: '골프 (17일 · 19일, 클럽은 현지 대여)', items: ['골프복 2벌(칼라 셔츠)', '골프화 · 장갑 · 골프 모자'] },
        { t: '상비약 · 햇빛 · 벌레', items: ['선크림 SPF50+', '모기 기피제(해밀턴 저녁)', '멀미약(요트 · 해밀턴 페리)', '소화제 · 진통제 · 밴드'] },
        { t: '개인 물품', items: ['선글라스', '평소 쓰는 화장품 · 스킨케어', '복용 중인 약(원래 포장 그대로)'] },
        { t: '호주 입국 주의', items: ['고기·과일·씨앗 같은 음식은 가져오지 않기(가져오면 반드시 신고)', '골프화·운동화 바닥의 흙은 깨끗이 털어 오기'] }
      ],
      items: [
        { t: '17:00', type: 'plane', name: '인천공항 제2터미널 · 아시아나 카운터', sub: '출발 3시간 전 · 제2터미널 3층 동쪽 아시아나 카운터(비즈니스는 J구역) · 수하물 1인 2개까지 · 항공권은 대한항공 KE5001로 발권되었고 운항은 아시아나 OZ601입니다', addr: '인천국제공항 제2터미널', q: 'Incheon International Airport Terminal 2', key: 'icn_t2', st: 'ok', note: '터미널은 출발 전날 항공사 앱에서 한 번 더 확인(전자항공권 기준 제2터미널).' },
        { t: '20:00', type: 'plane', name: 'OZ601 인천 → 시드니', sub: '10시간 20분 · 프레스티지(비즈니스) · 16일 08:20 시드니 도착(현지 시각)', key: 'biz_class_a380', st: 'ok', note: '발권 완료. 좌석 지정 여부 확인.' }
      ]
    },
    {
      id: 'd16', cover: 'empress', coverCap: 'Empress · 시드니 하버 나이트 크루즈', date: '2026-11-16', dow: '월', n: 1, city: '시드니', tz: 'Australia/Sydney', tzLabel: '시드니 시각 · 한국 +2시간',
      wx: [{ lo: 15, hi: 17, sky: '흐리고 비 올 수 있음', rain: '55%' }],
      title: '시드니 도착 · 커플 스파 · 애프터눈 티 · 하버 나이트 크루즈',
      intro: '밤 비행기로 아침에 도착하면 호텔에 짐을 맡기고 가볍게 먹습니다. 호텔 안 Auriga Spa에서 90분 트리트먼트를 받고 이어 Aperture에서 샴페인 애프터눈 티를 합니다. 원하면 근처 실크 잠옷 부티크 IM Lingerie에 들렀다가 쉬고 18:30 요트에 오릅니다. 해 지는 하버를 배 위에서 보며 셰프의 프렌치 코스로 저녁을 먹습니다.',
      stay: { name: 'Capella Sydney', sub: '24 Loftus St, Sydney NSW 2000', tel: '+61 2 9071 5000', q: 'Capella Sydney, 24 Loftus Street Sydney', key: 'capella_sydney', nights: '1/2박' },
      bring: ['따뜻한 겉옷(낮 17°C · 요트 위 밤바다 15°C · 바람 불면 더 쌀쌀)', '요트 저녁은 스마트 캐주얼 · 굽 낮은 신발(하이힐 불가)', '멀미약(요트 타기 30분 전)', '스파 · 애프터눈 티는 편한 옷차림(가운 · 슬리퍼는 스파에서 제공)', '수영복(스파 수영장을 쓰려면)', 'IM Lingerie에서 $300 이상 사면 영수증 챙기기(출국 때 환급)'],
      picks: [{ set: 'syd', when: '애프터눈 티 뒤 16:00–17:15 · 요트에서 내린 뒤 한 잔' }],
      items: [
        { t: '08:20', type: 'plane', name: '시드니 공항 제1터미널 도착 · OZ601', sub: '입국 심사·수하물 수령 약 60–90분 · 식품·흙 묻은 골프화는 신고 대상이니 흙은 털어 두세요', q: 'Sydney Airport International Terminal 1', key: 'syd_airport_t1', st: 'ok' },
        { via: 'car', text: '공항 → 호텔 차량 약 30–45분 (호스트 렌터카 · 골프백 2개)', mode: 'driving' },
        { t: '10:30 전후', type: 'hotel', name: 'Capella Sydney · 짐 보관', sub: '객실이 준비되기 전이면 짐만 맡기고 나섭니다 · 얼리 체크인은 호텔과 미리 조율', addr: '24 Loftus St, Sydney', q: 'Capella Sydney, 24 Loftus Street Sydney', tel: '+61 2 9071 5000', key: 'capella_sydney', st: 'ok', note: '얼리 체크인 요청함(보장 체크인 15:00). 호텔 자체 주차장 없음(헤리티지 건물) → 1 Farrer Place 또는 1 Bligh Street 주차장 이용.' },
        { t: '10:45', type: 'dining', name: '브런치 · Brasserie 1930 (Capella Sydney)', sub: '호텔 1층 · 비행 뒤 가볍게 · 스파 전이라 양은 적당히', addr: '24 Loftus St, Sydney', q: 'Capella Sydney, 24 Loftus Street Sydney', key: 'brasserie_1930', menu: 'brasserie_1930', st: 'ask', note: '11/12 Capella 다이닝팀에 3명 10:30 예약 요청 메일 보냄(호텔 확인 메일에 Brasserie 1930은 예약 권장). 패키지 조식이 도착일에도 적용되는지 같이 문의. 답장 대기. 입국·이동을 감안해 플래너는 10:45로 표시(요청은 10:30) — 답장 오면 시각 조정.' },
        { t: '12:45', type: 'spa', name: 'Auriga Spa · Connect to Country 90분 · 커플 룸', sub: '호텔 안 스파 · 여성 테라피스트 2명 · 15분 전 도착(일찍 가서 사우나·스팀 이용 가능) · 14:15 종료', addr: '24 Loftus St, Sydney', q: 'Capella Sydney, 24 Loftus Street Sydney', tel: '+61 2 9071 5010', key: 'auriga_spa', st: 'ok', note: '예약 완료(10/29). 패키지 포함 확인(스파 답변 10/30). 추가로 Expedia VIP 스파 크레딧 예약당 $50. 체크인 전에도 스파 시설(사우나·스팀) 사용 가능, 가운·슬리퍼 제공. 취소·변경은 24시간 전까지.' },
        { t: '14:30', type: 'dining', name: '애프터눈 티 · Aperture (Capella Sydney)', sub: '호텔 안 · 샴페인과 함께 · 스파에서 바로 이어집니다', addr: '24 Loftus St, Sydney', q: 'Capella Sydney, 24 Loftus Street Sydney', key: 'aperture_capella', menu: 'aperture_capella', st: 'ok', note: '11/16 14:30 2명 예약 완료(Capella Sojourn 패키지 포함). 식이 제한 없음 회신. SevenRooms 확정 요청(11/11)에 확정 완료(11/12).' },
        { pick: 'syd', when: '16:00–17:15 · 애프터눈 티 뒤' },
        { t: '16:15', type: 'shop', opt: true, name: 'IM Lingerie · 유럽 명품 실크 잠옷 부티크', sub: 'La Perla(이탈리아) · Lise Charmel · Aubade(프랑스) 잠옷과 란제리 · 선물 상담 가능 · 월요일 17:30까지 · 한 매장 $300 이상이면 출국 때 면세 환급(TRS) · 영수증 필요', addr: 'Stockland Piccadilly, 210 Pitt St, Sydney', q: 'IM Lingerie Stockland Piccadilly Sydney', tel: '+61 2 9232 0088', key: 'im_lingerie', note: '학수형이 가보자고 함(11/9). 애프터눈 티 뒤 도보 약 12분. 명품 거리(Castlereagh St · George St · Westfield Sydney)와 묶을 수 있음. 애프터눈 티(약 90분)가 끝난 뒤로 옮김. 오페라하우스 투어는 티와 겹쳐 뺌(17일 Bennelong에서 건물 안을 봄).' },
        { via: 'walk', text: '호텔 → Pitt St 도보 약 12분', mode: 'walking' },
        { t: '17:15', type: 'hotel', name: '호텔 · 쉬는 시간', sub: '객실에서 쉬는 시간 · 요트 전에 샤워하고 옷을 갈아입으세요', q: 'Capella Sydney, 24 Loftus Street Sydney', key: 'capella_sydney' },
        { via: 'walk', text: '승선 선착장까지 도보 또는 차량 (확정 후 안내)', mode: 'walking' },
        { t: '18:30', type: 'boat', name: 'Empress · 하버 나이트 크루즈 · 선상 프렌치 디너', sub: '77피트 모터요트 전세 · 4명(첫날 저녁 일행 1명 합류) · 18:30 시작(15분 전 선착장 도착) · 일몰 약 19:36 · 하버브리지 아래, 오페라하우스 앞, 도심 불빛 · 셰프 Pierre Gaudin(Noranise)의 맞춤 코스, 굴 3다스로 시작 · 코스마다 셰프가 고른 호주 와인 · 전자담배는 바깥 데크에서 가능 · 22:30 하선', q: 'Circular Quay Sydney', key: 'empress', menu: 'empress', st: 'ok', note: '결제 완료(11/11, 인보이스 #9764 · 전세 18:30–22:30 + 셰프 메뉴 $1,600). 메뉴·와인 확정, 셰프 Pierre가 소믈리에 겸함(11/10). 음료는 크루즈 뒤 따로 정산, 보증금 최대 $2,000 카드 사전승인(종료 후 해제). 남은 것: ① 승선 선착장이 적힌 최종 확인 메일(SHS가 곧 보낸다고 함) ② 11/9 와인 추가 요청(Grand Vintage·Blanc de Blancs, Mount Edelstone 디캔팅, 풀바디 레드 1병 추가, 작은 잔, 남은 병 가져가기) 셰프 답변 대기. 디저트 전 30분은 두 분이 플라이브리지에서 따로 야경을 보도록 크루에게 부탁.' },
        { via: 'car', text: '하선 뒤 호텔까지 차량 약 5–10분', mode: 'driving' },
        { t: '22:45 전후', type: 'hotel', name: '호텔 복귀', sub: '내일 07:50 출발 · 골프 가방과 골프복은 차에 실어 둡니다', q: 'Capella Sydney, 24 Loftus Street Sydney', key: 'capella_sydney' },
        { pick: 'syd', when: '22:45 이후 · 요트에서 내린 뒤 한 잔' },
      ],
      notes: '흐름: 10:30 호텔 → 10:45 브런치 → 12:45 스파 → 14:30 애프터눈 티(~16:00) → (선택) 16:15 IM Lingerie → 17:15 휴식 → 18:30 Empress → 22:45 호텔. 브리지클라임은 뺌(요트로 하버를 충분히 봄). 요트는 4명이지만 두 분만의 시간을 따로 만들어 드릴 것.'
    },
    {
      id: 'd17', cover: 'bondi_bronte', coverCap: '본다이 → 브론테 해안 산책', date: '2026-11-17', dow: '화', n: 2, city: '시드니', tz: 'Australia/Sydney', tzLabel: '시드니 시각 · 한국 +2시간',
      wx: [{ lo: 15, hi: 21, sky: '대체로 맑음', rain: '15%' }],
      title: '본다이 브런치 · 해안 산책 · 세인트 마이클 골프 · Bennelong · Whisky Thief',
      intro: '아침은 본다이의 bills에서 브런치로 시작합니다. 리코타 핫케이크로 유명한 빌 그레인저의 첫 가게입니다. 식사 뒤에는 본다이에서 브론테까지 해안 절벽길 2.5km를 40분쯤 걷습니다. 브론테에서 차로 20분 거리의 세인트 마이클 골프클럽으로 가서 11:51에 18홀을 돕니다. 바다를 낀 코스입니다. 호텔에서 잠깐 씻고 18:00에 오페라하우스 안 Bennelong에서 저녁을 먹습니다. 식사 뒤에는 차로 8분 거리의 위스키 바 Whisky Thief에서 호스트 일행과 한잔합니다.',
      stay: { name: 'Capella Sydney', sub: '24 Loftus St, Sydney NSW 2000', tel: '+61 2 9071 5000', q: 'Capella Sydney, 24 Loftus Street Sydney', key: 'capella_sydney', nights: '2/2박' },
      bring: ['아침 산책용 얇은 겉옷(출발 때 15°C 안팎 · 걸으면 금방 더워짐)', '걷기 편한 운동화 · 모자 · 선글라스 · 선크림', '골프 복장: 칼라 셔츠 · 긴바지나 테일러드 쇼츠 · 골프화 · 장갑(드레스코드 엄격 · 청바지 불가)', '라커룸에서 갈아입을 옷 · 바닷바람 대비 바람막이', 'Bennelong · Whisky Thief는 스마트 캐주얼 · 밤에는 겉옷'],
      picks: [{ set: 'syd', when: '오늘은 골프 뒤 쉬는 시간이 짧아요 · 호텔 주변 산책은 내일 아침에도' }],
      items: [
        { t: '07:50', type: 'car', name: '호텔 출발 · 호스트 차량', sub: '골프 가방은 차에 그대로 · bills 앞에 내려 드리고 차는 브론테에서 기다립니다', q: 'Capella Sydney, 24 Loftus Street Sydney', note: '렌터카(호스트 운전): 07:50 호텔 → bills 본다이 하차 → 브론테 주차 → 10:40 출발 → 세인트 마이클 → 16:30 출발 → 17:15 호텔. 골프백 3개.' },
        { via: 'car', text: '본다이까지 차량 약 15–25분 (화요일 07:50 기준 지도 예상 12–26분)', mode: 'driving' },
        { t: '08:20', type: 'dining', name: '본다이 브런치 · bills Bondi Beach', sub: '빌 그레인저가 시드니 브런치 문화를 연 첫 가게 · 리코타 핫케이크와 스크램블드 에그가 대표 메뉴 · 아침은 예약 없이 입장(매일 07:00부터, 아침 메뉴는 12시까지) · 해변까지 걸어서 3분', addr: '79 Hall St, Bondi Beach', q: 'bills Bondi Beach 79 Hall Street', tel: '+61 2 8412 0700', site: 'https://www.bills.com.au/', key: 'bills_bondi', menu: 'bills_bondi', note: '공식 사이트 확인(11/12): 매일 07:00 오픈, 예약은 17시 이후만 받고 워크인은 항상 가능. 평일 08:20이면 대기 짧은 편. 주차: 같은 건물 Wilson Parking(O’Brien St 진입) 1시간 $5. 대안: Speedos Cafe(노스 본디 해변 위, 06:00부터, 스무디볼·바다 전망).' },
        { via: 'walk', text: 'bills → 본다이 해변 남쪽 끝 Icebergs 도보 약 10분', mode: 'walking' },
        { t: '09:40', type: 'walk', name: '본다이 → 브론테 해안 산책 · 약 2.5km', sub: 'Icebergs 수영장 위에서 출발해 매켄지스 포인트, 타마라마를 지나 브론테 해변까지 · 사진 포함 40–50분 · 시작 부분에 계단이 조금 있고 나머지는 포장길 · 화장실은 본다이·타마라마·브론테에', q: 'Bondi to Bronte Coastal Walk', key: 'bondi_bronte' },
        { t: '10:25', type: 'dining', opt: true, name: '브론테에서 커피 한 잔 · The Bogey Hole Cafe', sub: '브론테 해변 공원 바로 앞 오래된 동네 카페 · 매일 07:00–16:00 · 출발 전 15분 · 테이크아웃해서 차에서 마셔도 됩니다', addr: '473 Bronte Rd, Bronte', q: 'The Bogey Hole Cafe 473 Bronte Road Bronte', key: 'bogey_hole_cafe', menu: 'bogey_hole_cafe' },
        { via: 'car', text: '브론테 → 리틀 베이 차량 약 20–30분 (화요일 10:40 기준 지도 예상 20–28분)', mode: 'driving' },
        { t: '11:10', type: 'golf', name: '세인트 마이클 골프클럽 도착 · 수속', sub: '티타임 40분 전 · 옷은 라커룸에서 · 드레스코드가 엄격합니다: 칼라 셔츠, 긴바지 또는 테일러드 쇼츠, 골프화', addr: 'Jennifer St, Little Bay NSW 2035', q: "St Michael's Golf Club, Little Bay", tel: '+61 2 9326 8000', key: 'st_michaels_golf', st: 'ok', note: '11/17 11:51 예약 확정(클럽 답변 11/10, 사전 결제 없이 당일 결제). 4인으로 변경 확정, 렌탈 클럽(남 Titleist GTS ×3 · 여 Callaway Ai Smoke ×1) 준비 완료(11/10). 그린피 해외 방문객 $285, 호스트 $170, 카트 A$50.' },
        { t: '11:51', type: 'golf', name: '세인트 마이클 · 18홀 · 티타임 11:51', sub: '약 4–4.5시간 · 바닷가를 따라 도는 파72 · 홀마다 바다 쪽 바람을 봐야 합니다 · 아침 뒤 첫 식사이니 9홀 뒤 클럽하우스에서 간단히 요기', q: "St Michael's Golf Club, Little Bay", key: 'st_michaels_golf', st: 'ok' },
        { t: '16:15 전후', type: 'dining', opt: true, name: '라운드 후 클럽하우스에서 한 잔', sub: '바다 전망 · 저녁 일정이 있어 15분 정도만 · 16:30 출발', q: "St Michael's Golf Club, Little Bay", key: 'st_michaels_golf', menu: 'st_michaels_golf' },
        { via: 'car', text: '16:30 출발 · 리틀 베이 → 호텔 차량 약 35–45분 (오후 교통)', mode: 'driving' },
        { t: '17:15', type: 'hotel', name: '호텔 · 씻고 옷 갈아입기', sub: '저녁 전 25분 정도 · Bennelong은 스마트 캐주얼', q: 'Capella Sydney, 24 Loftus Street Sydney', key: 'capella_sydney' },
        { via: 'walk', text: '17:40 호텔 출발 · 오페라하우스까지 도보 약 15–20분 (서큘러키 물가)', mode: 'walking' },
        { t: '18:00', type: 'dining', name: 'Bennelong 저녁 · 오페라하우스 안', sub: '오페라하우스 돛 아래의 레스토랑 · 코스 요리 3가지 중 고르는 The Restaurant · 소믈리에에게 코스에 맞는 와인을 맡기기 좋은 곳 · 입구는 오페라하우스 정문 1층(바깥 계단 아래) · 문의 02 9240 8000', addr: 'Sydney Opera House, Bennelong Point', q: 'Bennelong Restaurant Sydney Opera House', tel: '+61 2 9240 8000', key: 'bennelong', menu: 'bennelong', st: 'ask', note: '11/13 컨시어지에 19:45→18:00(안 되면 17:45) 변경 요청 · 답장 대기, 확정되면 예약 완료로 바꾸기. 원래 예약은 Capella 컨시어지(10/31, 호텔 보증 · 48시간 안 취소 시 1인 $200대). 창가 · 와인 페어링(풀바디 레드 선호) 미리 알리기. 호스트는 근처에서 대기.' },
        { via: 'car', text: 'Bennelong → Prefecture 48 차량 약 7–8분 (2.2km)', mode: 'driving' },
        { t: '20:30', type: 'dining', name: 'Whisky Thief at Prefecture 48 · 위스키 바', sub: '호스트 지인이 운영하는 바 · 호스트 일행 2명이 합류해 모두 5명 · 위스키 증류소에서 영감을 얻은 아늑한 공간에서 희귀 위스키와 창작 칵테일 · 일본 미식 공간 Prefecture 48 안 · 화요일 23:00 마감', addr: '230 Sussex St, Sydney', q: 'Whisky Thief Prefecture 48 230 Sussex Street Sydney', tel: '+61 2 8552 2888', site: 'https://www.p48.com.au/venues-whisky-thief/', key: 'whisky_thief', note: '제임스형과 지인 1명 합류(호스트 포함 5명). 운영자가 호스트 지인이라 자리 미리 말해 두기. Bennelong 18:00 변경이 확정돼야 여유 있음(19:45 그대로면 22:30 도착, 30분뿐). 화–목 17:00–23:00.' },
        { via: 'car', text: 'Prefecture 48 → 호텔 차량 약 7분', mode: 'driving' },
        { t: '23:00 전후', type: 'hotel', name: '호텔 복귀', sub: '내일 아침은 느긋하게 · 10:15 체크아웃', q: 'Capella Sydney, 24 Loftus Street Sydney', key: 'capella_sydney' },
        { t: '대안', type: 'walk', alt: true, under: '09:40', name: '더 짧게 · Icebergs 전망만 보기 · 20분', sub: '전날 요트로 피곤하면 브런치 뒤 Icebergs 수영장 위 전망대까지만 걷고 본다이에서 바로 차로 · 골프장까지 약 25분', q: 'Bondi Icebergs Lookout', key: 'bondi_bronte' }
      ],
      notes: '11/12 변경: 본다이→쿠지 6km(2시간)를 본다이→브론테 2.5km(40–50분)로 줄이고, 쿠지 Coogee Pavilion 대신 bills 본다이 브런치로. 출발도 06:55→07:50. 세인트 마이클 11:51 확정(11/10). NSW Golf Club은 비회원 승인 문제로 제외. Auriga 스파는 17일 자리가 없어 16일로 옮김. Bennelong 19:45(Capella 컨시어지)를 18:00으로 변경 요청 중. 11/13: 식사 뒤 Whisky Thief(호스트 지인 바, 제임스형 · 지인 1명 합류) 추가.'
    },
    {
      id: 'd18', cover: 'one_tree_hill', coverCap: '원트리힐에서 보는 휘트선데이 일몰', date: '2026-11-18', dow: '수', n: 3, city: '해밀턴 아일랜드', short: '해밀턴', tz: 'Australia/Brisbane', tzLabel: '오전은 시드니 시각 · 도착 뒤 퀸즐랜드 시각(시드니 −1시간 · 한국 +1시간)',
      wx: [{ city: '시드니', lo: 16, hi: 23, sky: '맑음', rain: '10%' }, { city: '해밀턴', lo: 26, hi: 28, sky: '덥고 습함 · 소나기 가능', rain: '15–90%' }],
      title: '시드니 → 해밀턴 아일랜드 · 스위트 체크인 · 원트리힐 선셋',
      intro: '아침은 서두르지 않습니다. 원하면 호텔 옆 왕립 식물원을 걸어 미세스 매쿼리 체어에서 하버를 한 번 더 봅니다. 낮 비행기(버진 VA1283 12:40)로 섬에 건너가면 시계를 한 시간 뒤로 돌립니다. Reef View Hotel의 2층 스위트(전용 플런지 풀)에 짐을 풉니다. 해 질 녘 원트리힐에서 휘트선데이 일몰을 보고 요트클럽의 Bommie에서 저녁을 먹습니다.',
      stay: { name: 'Reef View Hotel · Superior Presidential Suite', sub: '12 Resort Drive, Hamilton Island QLD 4803 · 침실 2 · 욕실 2 · 전용 플런지 풀 테라스', tel: '+61 7 4946 9999', q: 'Reef View Hotel, Hamilton Island', key: 'reef_view_suite', nights: '1/2박' },
      bring: ['시드니 출발은 겉옷 · 해밀턴 도착 후엔 반팔(26–28°C · 습함)', '샌들 · 선글라스 · 모자 · 선크림(자외선 매우 강함)', '수영복(스위트 플런지 풀)', '모기 기피제(저녁 원트리힐)', 'Bommie 저녁은 스마트 캐주얼', '보조배터리는 기내 가방에(위탁 불가)'],
      picks: [{ set: 'syd', when: '아침 08:00–10:15 · 커피와 산책' }, { set: 'ham', when: '체크인 뒤 15:15–17:15' }],
      items: [
        { t: '08:00', type: 'dining', name: '조식 · 느긋한 아침', sub: '짐 정리', q: 'Capella Sydney, 24 Loftus Street Sydney', key: 'brasserie_1930', menu: 'brasserie_1930', tz: 'Australia/Sydney' },
        { pick: 'syd', when: '08:00–10:15 · 아침 커피와 산책' },
        { t: '09:00', type: 'walk', opt: true, name: '왕립 식물원 · 미세스 매쿼리 체어 산책', sub: '호텔에서 걸어서 5분 · 오페라하우스와 하버브리지가 한 장에 담기는 전망 · 한 시간 안팎', q: 'Mrs Macquaries Chair Sydney', key: 'mrs_macquaries', tz: 'Australia/Sydney' },
        { t: '10:15', type: 'hotel', name: '체크아웃', sub: '미니바·세탁 정산', q: 'Capella Sydney, 24 Loftus Street Sydney', key: 'capella_sydney', tz: 'Australia/Sydney' },
        { t: '10:30', type: 'car', name: '호텔 출발', sub: '국내선 제2터미널(버진 오스트레일리아)로 · 손님과 짐을 먼저 내려 드린 뒤 호스트가 렌터카 반납', q: 'Capella Sydney, 24 Loftus Street Sydney', tz: 'Australia/Sydney', note: '호스트 렌터카로 이동(골프백). T2 출발층에서 손님·짐 하차 → 렌터카 반납(공항 반납 구역) → 체크인 합류. 반납 시간 감안해 출발을 10:45→10:30으로 당김.' },
        { via: 'car', text: '시드니 국내선 T2까지 차량 약 30–45분', mode: 'driving' },
        { t: '11:25', type: 'plane', name: '시드니 공항 제2터미널 · 버진 체크인', sub: '출발 75분 전 · 비즈니스 라운지', q: 'Sydney Airport Terminal 2 Domestic', key: 'syd_airport_t2', tz: 'Australia/Sydney' },
        { t: '12:40', type: 'plane', name: 'VA1283 시드니 → 해밀턴 아일랜드', sub: '2시간 30분 · 14:10 도착(퀸즐랜드 시각) · 보잉 737-800 비즈니스 · 좌석 1D·1F 나란히 · 기내식 점심', key: 'virgin_business', tz: 'Australia/Sydney', st: 'ok', note: '예약 완료(버진 비즈니스). 좌석 지정 완료: 두 분 1D·1F(나란히), 호스트 2D. 골프백 위탁 신고. 같은 날 다른 예약(VA925+VA1495 경유편)은 10/21 취소해 트래블뱅크 크레딧으로 전환한 뒤 이 편으로 재예약함.' },
        { t: '14:10', type: 'plane', name: '해밀턴 아일랜드 공항 도착', sub: '퀸즐랜드 시각 · 수하물 수령 후 스위트 전용 VIP 차량(항공편은 호텔에 등록)', q: 'Hamilton Island Airport', key: 'hamilton_airport', st: 'chk', note: '호텔 확인 메일(10/22)과 잔금 안내(11/6)에 "이동편 정보를 보내면 공항 이동을 준비"라고 돼 있음 → VA1283 14:10 도착을 호텔에 보냈는지 재확인. 잔금은 11/12 결제 완료(스위트·호스트 객실 모두). VIP 전용 차량이 안 보이면 리조트 셔틀(포함).' },
        { via: 'car', text: '공항 → Reef View Hotel 전용 차량 약 5–10분', mode: 'driving' },
        { t: '14:30', type: 'hotel', name: 'Reef View Hotel 체크인 · Superior Presidential Suite', sub: '체크인 14:00 · 스위트 컨시어지 데스크 · 2층 구조: 아래층 거실·다이닝·테라스 플런지 풀, 위층 침실 2·욕실 2 · 캣츠아이 비치 전망 · 4인승 버기 포함(키 수령)', addr: '12 Resort Drive, Hamilton Island', q: 'Reef View Hotel, Hamilton Island', tel: '+61 7 4946 9999', key: 'reef_view_suite', st: 'ok', note: '2박 · 세이버 요금(조식 포함). 포함: VIP 공항 왕복, 4인승 버기, 무알코올 미니바(매일 보충), 카타마란·카약·SUP·스노클 장비, 아일랜드 셔틀, 피트니스·사우나·테니스. 대여 버기는 따로 있으니 스위트 버기는 두 분 전용.' },
        { t: '15:15', type: 'pin', name: '자유 시간 · 플런지 풀 · 캣츠아이 비치', sub: '쉬거나 해변을 걷는 시간 · 카타마란·카약은 비치 스포츠 데스크에서 무료', q: 'Catseye Beach Hamilton Island', key: 'catseye_beach' },
        { pick: 'ham', when: '15:15–17:15 · 체크인 뒤' },
        { via: 'buggy', text: '원트리힐까지 버기 약 5분 (언덕길)', mode: 'driving' },
        { t: '17:30', type: 'pin', name: '원트리힐 선셋 · 칵테일', sub: '섬에서 가장 유명한 일몰 전망대 · 바는 14:00–일몰, 마르가리타 밴 15:00–19:00 · 일몰 약 18:20', q: 'One Tree Hill Lookout Hamilton Island', key: 'one_tree_hill' },
        { via: 'buggy', text: '원트리힐 → 마리나 요트클럽 버기 약 10분 · 칵테일을 마셨다면 호스트가 운전', mode: 'driving' },
        { t: '19:00', type: 'dining', name: 'Bommie 저녁 · 해밀턴 아일랜드 요트클럽', sub: '셰프 햇 · 3코스 또는 디거스테이션 · 스마트 캐주얼 · 덴트 패시지 전망', addr: 'Hamilton Island Yacht Club, Front St', q: 'Bommie Restaurant Hamilton Island Yacht Club', key: 'bommie', menu: 'bommie', st: 'ok', note: '2명 19:00 예약 완료(SevenRooms). 창가 요청 + 와인 페어링(풀바디 레드 선호)을 미리 메모로 남기기. 호스트는 주문 뒤 자리를 비우고, 식사 뒤 버기로 모심(퀸즐랜드는 버기도 음주운전 규정 적용).' },
        { via: 'buggy', text: '호텔까지 무료 그린 셔틀(22:45까지, 10–12분 간격) 또는 호스트 운전 버기 약 10분 · 와인 뒤 직접 운전은 피하기', mode: 'driving' },
        { t: '21:30 전후', type: 'hotel', name: '호텔 복귀', sub: '내일 골프 · 06:15 조식', q: 'Reef View Hotel, Hamilton Island', key: 'reef_view_suite' }
      ],
      notes: 'qualia 예약이 안 되어 Reef View Hotel 스위트로 변경. 스위트에 4인승 버기가 포함되므로 별도 대여 버기는 호스트용(픽업 14:15 · 반납 20일 12:45 예약이지만 11:00 전후 반납).'
    },
    {
      id: 'd19', cover: 'hamilton_island_golf', coverCap: '덴트섬 Hamilton Island Golf Club', date: '2026-11-19', dow: '목', n: 4, city: '해밀턴 아일랜드', short: '해밀턴', tz: 'Australia/Brisbane', tzLabel: '퀸즐랜드 시각 · 한국 +1시간',
      wx: [{ lo: 25, hi: 27, sky: '덥고 습함 · 소나기 가능', rain: '20–90%' }],
      title: '덴트섬 골프 08:30 · 플런지 풀에서 쉬기 · Catseye Pool Club',
      intro: '아침 페리로 덴트섬에 건너가 Hamilton Island Golf Club 18홀을 돕니다(티타임 08:30). 점심은 라운드 뒤 클럽하우스에서 먹습니다. 오후에는 돌아와 스위트 플런지 풀과 해변에서 자유롭게 쉽니다. 저녁은 걸어서 가는 The Sundays의 Catseye Pool Club입니다.',
      stay: { name: 'Reef View Hotel · Superior Presidential Suite', sub: '12 Resort Drive, Hamilton Island QLD 4803 · 침실 2 · 욕실 2 · 전용 플런지 풀 테라스', tel: '+61 7 4946 9999', q: 'Reef View Hotel, Hamilton Island', key: 'reef_view_suite', nights: '2/2박' },
      bring: ['골프복(통기성 좋은 옷) · 골프화 · 장갑 · 여벌 셔츠', '모자 · 선글라스 · 선크림(SPF50+, 자외선 매우 강함)', '얇은 바람막이(소나기 가능)', '멀미약(골프 페리 약 10분, 배멀미가 있다면)', '수영복(오후 플런지 풀 · 해변)', '모기 기피제 · 저녁은 가벼운 여름 옷차림'],
      picks: [{ set: 'ham', when: '골프 뒤 15:00–18:45 · 저녁 뒤' }],
      items: [
        { t: '06:15', type: 'dining', name: '조식 · Pool Terrace', sub: '호텔 수영장 옆 · 조식 06:00부터(포함) · Sails는 07:00부터', q: 'Pool Terrace Restaurant Reef View Hotel Hamilton Island', key: 'pool_terrace', menu: 'pool_terrace' },
        { via: 'buggy', text: '호텔 → 마리나 버기 약 10분 · 골프클럽 제티(Manta Ray 옆)에 주차', mode: 'driving' },
        { t: '07:40', type: 'ferry', name: '골프클럽 제티 도착 · 페리 대기', sub: '08:00 페리 15분 전까지 기장에게 체크인 · 마리나 빌리지 Manta Ray 옆', q: 'Hamilton Island Golf Club jetty, Marina Village', key: 'hamilton_island_golf', st: 'ok', note: '골프장 확인 메일(10/21): 08:30 티타임은 08:00 페리, 기장에게 15분 전 체크인. 해밀턴 출발 매시 정각, 덴트섬 출발 매시 30분.' },
        { t: '08:00', type: 'ferry', name: '골프 페리 → 덴트섬', sub: '약 10분 · 돌아오는 배는 덴트섬에서 매시 30분', q: 'Hamilton Island Golf Club jetty, Marina Village', key: 'hamilton_island_golf' },
        { t: '08:30', type: 'golf', name: 'Hamilton Island Golf Club · 18홀 · 티타임 08:30', sub: '약 4–4.5시간 · 버기와 왕복 페리 포함 · 클럽 대여 1인 A$70 · 문의 07 4948 9760', addr: 'Dent Island', q: 'Hamilton Island Golf Club, Dent Island', tel: '+61 7 4948 9760', key: 'hamilton_island_golf', st: 'ok', note: '티타임 08:30 예약 완료(3명 · 18홀). 렌탈 클럽(남 Titleist T150 GT3 ×2 · 여 Titleist T350 GT2 ×1) 예약 완료(11/10).' },
        { t: '13:00 전후', type: 'dining', name: '클럽하우스 점심 · 덴트 패시지 전망', sub: '라운드 후', q: 'Hamilton Island Golf Club, Dent Island', key: 'hamilton_island_golf', menu: 'hamilton_island_golf' },
        { t: '14:30 예시', type: 'ferry', name: '페리로 해밀턴 복귀', sub: '덴트섬 출발 매시 30분 · 마리나에서 버기', q: 'Hamilton Island Marina Village', key: 'hamilton_island_golf' },
        { t: '15:00', type: 'hotel', name: '자유 시간 · 플런지 풀 · 해변', sub: '쉬는 시간 · 스위트 테라스 플런지 풀, 캣츠아이 비치 · 원하면 아래 "둘이서 골라 가기"에서 · 해 지는 모습은 테라스에서(일몰 약 18:20)', q: 'Reef View Hotel, Hamilton Island', key: 'reef_view_suite' },
        { pick: 'ham', when: '15:00–18:45 · 골프 뒤' },
        { via: 'walk', text: 'Catseye Pool Club까지 도보 약 5–10분 (리조트 드라이브 · 비치 쪽)', mode: 'walking' },
        { t: '19:00', type: 'dining', name: 'Catseye Pool Club 저녁 · The Sundays', sub: '조시·줄리 닐런드(시드니 Saint Peter) 메뉴 · 셰어 스타일 · 캣츠아이 베이 물가 · 저녁 17:00–21:00 · 셰프 햇', addr: 'The Sundays, Catseye Beach', q: 'Catseye Pool Club The Sundays Hamilton Island', key: 'catseye_pool_club', menu: 'catseye_pool_club', st: 'chk', note: '예약 완료(SevenRooms, 11/10)로 기록돼 있으나 11/12 메일함 3곳(jk.optico·john.kim·admin)에서 확인 메일을 못 찾음 → 예약에 쓴 이메일·이름 확인 필요. 2명 19:00 · 물가 테이블·와인 추천 요청함. 대안: coca chu 또는 Romano\'s(마리나).' },
        { t: '21:00 전후', type: 'hotel', name: '호텔 복귀 · 도보', sub: '내일 10:00 체크아웃', q: 'Reef View Hotel, Hamilton Island', key: 'reef_view_suite' },
        { pick: 'ham', when: '21:00 이후 · 저녁 뒤' },
        { t: '대안', type: 'boat', alt: true, under: '15:00', name: '오후에 선셋 크루즈', sub: '바다에서 해 지는 것을 보고 싶을 때 · 프라이빗 차터(Palm Beach 55피트) 또는 On the Edge 공용 선셋 세일(약 90분) · 17:00 마리나 출항', q: 'Hamilton Island Marina Village', key: 'sunset_sail', st: 'ask', note: '해밀턴 아일랜드 투어 데스크 1300 659 133. 16일에 요트를 탔으니 기본안은 휴식.' }
      ],
      notes: '저녁은 호텔에서 걸어가는 Catseye Pool Club으로 두어 버기 야간 운전을 피함.'
    },
    {
      id: 'd20', cover: 'howard_smith_wharves', coverCap: 'Howard Smith Wharves와 스토리브리지', date: '2026-11-20', dow: '금', n: 5, city: '브리즈번', tz: 'Australia/Brisbane', tzLabel: '퀸즐랜드 시각 · 한국 +1시간',
      wx: [{ city: '해밀턴', lo: 25, hi: 29, sky: '소나기 가능', rain: '70%' }, { city: '브리즈번', lo: 17, hi: 24, sky: '구름 조금 · 밤에 소나기 가능', rain: '40%' }],
      title: '해밀턴 아일랜드 → 브리즈번 · Queen\'s Wharf 체크인 · Exhibition · 강변 야경',
      intro: '아침은 비치프런트 조식과 캣츠아이 비치 산책으로 천천히 보내고 낮 비행기로 브리즈번에 옵니다. 강가에 새로 지은 Queen\'s Wharf의 The Star Grand 리버 스위트에 짐을 풉니다. 저녁은 18시에 Exhibition에서 테이스팅 코스로 먹습니다. 호텔에서 걸어서 10분 남짓입니다. 식사 뒤에는 스토리브리지 아래 강변을 걷거나 바로 호텔로 돌아와 방에서 강 야경을 봅니다.',
      stay: { name: 'The Star Grand Brisbane · River Suite', sub: 'Queen\'s Wharf, 33 William St, Brisbane City · 브리즈번강·사우스뱅크 전망', q: 'The Star Grand Brisbane, Queens Wharf', key: 'star_grand_brisbane', nights: '1/2박' },
      bring: ['해밀턴 출발은 반팔 · 카약이나 SUP를 하면 수영복', '브리즈번 저녁용 얇은 겉옷(밤 17°C · 밤에 소나기 가능)', 'Exhibition 저녁은 스마트 캐주얼', '식사 뒤 강변 산책용 편한 신발', '선글라스 · 모자', '보조배터리는 기내 가방에(위탁 불가)'],
      picks: [{ set: 'ham', when: '아침 08:30–10:00' }, { set: 'bne', when: '체크인 뒤 16:00–17:30 · 저녁 뒤' }],
      items: [
        { t: '07:30', type: 'dining', name: '조식 · Sails · 비치프런트', sub: '캣츠아이 비치 앞 · 조식 07:00–10:30(포함)', q: 'Sails Restaurant Hamilton Island', key: 'sails_hi', menu: 'sails_hi' },
        { t: '08:30', type: 'walk', name: '캣츠아이 비치 산책 · 카약 또는 SUP(선택)', sub: '짐 정리 전 가볍게 · 비치 스포츠 장비 무료', q: 'Catseye Beach Hamilton Island', key: 'catseye_beach' },
        { pick: 'ham', when: '08:30–10:00 · 아침' },
        { t: '10:00', type: 'hotel', name: '체크아웃 · 짐 보관 · 스위트 버기 반납', sub: '체크아웃 10:00 · 공항 VIP 차량 시각은 스위트 컨시어지와 확정', q: 'Reef View Hotel, Hamilton Island', key: 'reef_view_suite', st: 'chk', note: '호텔 예약에 VA1496 12:40 출발 등록됨 → 공항 이동 11:15 전후. 대여 버기는 11:00까지 반납(예약상 12:45).' },
        { t: '10:15', type: 'shop', opt: true, name: '리조트 센터 · 커피와 가게들', sub: '호텔 옆 · 출발 전 한 시간', q: 'Resort Centre Hamilton Island', key: 'resort_centre_hi' },
        { via: 'car', text: '호텔 → 공항 VIP 전용 차량 약 5–10분', mode: 'driving' },
        { t: '11:15', type: 'plane', name: '해밀턴 아일랜드 공항 · 버진 체크인', sub: '작은 공항 · 출발 60–90분 전', q: 'Hamilton Island Airport', key: 'hamilton_airport' },
        { t: '12:40', type: 'plane', name: 'VA1496 해밀턴 아일랜드 → 브리즈번', sub: '1시간 35분 · 14:15 도착 · 같은 퀸즐랜드 시각 · 보잉 737-800 비즈니스 · 좌석 1A·1C 나란히', key: 'virgin_business', st: 'ok', note: '예약 완료(버진). 두 분 비즈니스 좌석 1A·1C(나란히). 호스트는 별도 예약(이코노미 4D). 골프백 위탁 신고.' },
        { t: '14:15', type: 'plane', name: '브리즈번 공항 국내선 도착', sub: '수하물 수령 후 차량', q: 'Brisbane Airport Domestic Terminal', key: 'bne_airport' },
        { via: 'car', text: '공항 → Queen\'s Wharf 차량 약 20–30분 (호스트 차량 · 수하물·차량 수령 시간 별도)', mode: 'driving' },
        { t: '15:30', type: 'hotel', name: 'The Star Grand 체크인 · River Suite', sub: '카지노 로비와 분리된 호텔 전용 리셉션 · 고층 · 사우스뱅크와 강 쪽 전망 요청 · 원하면 수영장에서 잠깐 쉬어도 좋습니다', addr: 'Queen\'s Wharf, 33 William St, Brisbane City', q: 'The Star Grand Brisbane, Queens Wharf', key: 'star_grand_brisbane', st: 'ok', note: '2박 예약 완료(Hotels.com, 호스트 이름). 두 분 이름 추가·최고층·공사 뷰 제외 요청 메일. 호스트 River King Room 별도. 주차: 셀프 약 $45 · 대리주차 약 $65/박.' },
        { pick: 'bne', when: '16:00–17:30 · 체크인 뒤' },
        { via: 'walk', text: '호텔 → Exhibition 도보 약 10–12분 (Edward St)', mode: 'walking' },
        { t: '18:00', type: 'dining', name: 'Exhibition 저녁 · 테이스팅 코스', sub: '테이스팅 메뉴 약 2–2.5시간 · 지하 2층(Basement 2) · 18:00 예약 완료', addr: 'Basement 2, 109 Edward St, Brisbane', q: 'Exhibition Restaurant, 109 Edward Street Brisbane', key: 'exhibition_restaurant', menu: 'exhibition_restaurant', st: 'ok', note: '18:00 예약 완료(18시 회차만 가능, 확인 메일 10/21 · Exhibition Experience 3명, 보증금만 걸림). 3명. 와인 페어링(풀바디 레드 선호) 미리 알리기.' },
        { via: 'walk', text: 'Edward St → 이글 스트리트 피어 → 스토리브리지 아래 리버워크 → Howard Smith Wharves 도보 약 25–30분', mode: 'walking' },
        { t: '20:45', type: 'walk', opt: true, name: '브리즈번강 야경 산책 · 리버워크와 스토리브리지', sub: '식사 뒤 강을 따라 불 켜진 스토리브리지 아래를 걸어 Howard Smith Wharves까지 · 브루어리 Felons Barrel Hall이나 강가 바에서 마무리 · 피곤하면 차량으로 바로 호텔', addr: 'Howard Smith Wharves, 5 Boundary St', q: 'Howard Smith Wharves Brisbane', key: 'howard_smith_wharves', note: '브리즈번강 요트는 20일 예약이 모두 차서 뺐습니다(문의 완료).' },
        { via: 'car', text: 'Howard Smith Wharves → 호텔 차량 약 5–10분', mode: 'driving' },
        { t: '22:00 전후', type: 'hotel', name: '호텔 복귀', sub: '방에서 강과 스토리브리지 야경 · 내일은 느긋한 아침', q: 'The Star Grand Brisbane, Queens Wharf', key: 'star_grand_brisbane' },
        { pick: 'bne', when: '22:00 이후 · 저녁 뒤' },
      ],
      notes: '11/9 하루 연장 확정 → 브리즈번 2박(The Star Grand), 22일 귀국. The Calile은 예약하지 않았음.'
    },
    {
      id: 'd21', cover: 'new_farm_market', coverCap: '뉴팜 파머스 마켓', date: '2026-11-21', dow: '토', n: 6, city: '브리즈번', tz: 'Australia/Brisbane', tzLabel: '퀸즐랜드 시각 · 한국 +1시간',
      wx: [{ lo: 19, hi: 26, sky: '구름 조금 · 소나기 가능', rain: '40%' }],
      title: '뉴팜 파크 마켓 · 강가에서 맥주 · 리버워크 · Howard Smith Wharves 점심 · SUUM · Sky Deck 야경',
      intro: '토요일 아침에만 열리는 파워하우스 파머스 마켓을 구경하고 옛 발전소 건물의 강가 테라스에서 맥주와 칩스를 즐깁니다. 그다음 강을 따라 이어지는 리버워크를 걸어 스토리브리지 아래 Howard Smith Wharves까지 가서 점심을 먹습니다. 호스트가 뉴팜 파크에 내려 드리고 Howard Smith Wharves에서 다시 모십니다. 낮 동안은 두 분만의 데이트입니다. 저녁은 16석 한식 오마카세 SUUM, 마무리는 Sky Deck 야경입니다.',
      stay: { name: 'The Star Grand Brisbane · River Suite', sub: 'Queen\'s Wharf, 33 William St, Brisbane City · 브리즈번강·사우스뱅크 전망', q: 'The Star Grand Brisbane, Queens Wharf', key: 'star_grand_brisbane', nights: '2/2박' },
      bring: ['걷기 편한 신발 · 모자 · 선글라스 · 선크림(리버워크는 그늘이 적음 · 최고 26°C)', 'SUUM 저녁은 스마트 캐주얼 · 얇은 겉옷', '카지노에 가려면 여권(입구에서 신분증을 확인할 수 있음)', '밤에 짐 정리(내일 05:10 출발)'],
      picks: [{ set: 'bne', when: '오후 14:30–17:00 · 저녁 뒤' }],
      items: [
        { t: '08:00', type: 'dining', name: '조식 · 호텔', sub: '느긋한 아침', q: 'The Star Grand Brisbane, Queens Wharf', key: 'star_grand_brisbane' },
        { t: '09:30', type: 'car', name: '호텔 출발 · 호스트 차량으로 뉴팜 파크까지', sub: '차로 약 10–15분 · 파워하우스 앞 하차', q: 'The Star Grand Brisbane, Queens Wharf' },
        { via: 'car', text: 'Queen\'s Wharf → 뉴팜 파크(브리즈번 파워하우스) 차량 약 10–15분', mode: 'driving' },
        { t: '09:45', type: 'shop', name: '뉴팜 파머스 마켓', sub: '토요일 아침마다 옛 발전소 앞 강가에 서는 동네 장터입니다. 농부들이 직접 가져온 과일과 치즈, 꿀, 갓 구운 빵이 있습니다. 커피를 들고 천천히 구경하기 좋습니다. 강아지 데리고 장 보러 나온 현지인 사이를 걷다 보면 브리즈번의 주말 아침이 그대로 느껴집니다. 12시에 끝납니다.', addr: 'Brisbane Powerhouse, 119 Lamington St, New Farm', q: 'Brisbane Powerhouse Farmers Market New Farm', site: 'https://newfarmpark.com.au/jan-powers-farmers-markets/', key: 'new_farm_market' },
        { t: '11:00', type: 'dining', name: '강가 테라스에서 맥주와 칩스 · Mary Mae\'s', sub: '파워하우스 안 강변 테라스 · 브리즈번강이 막힘없이 보이는 자리 · 토요일 08:00–21:00 · 옆 Bar Alto(이탈리안, 09:30부터)도 가능', addr: 'Brisbane Powerhouse, 119 Lamington St, New Farm', q: 'Mary Maes Brisbane Powerhouse', site: 'https://brisbanepowerhouse.org/visit/', key: 'mary_maes', menu: 'mary_maes' },
        { via: 'walk', text: '뉴팜 파크 강변 → 뉴팜 리버워크 → Howard Smith Wharves 도보 약 2.7km · 37분', mode: 'walking' },
        { t: '11:45', type: 'walk', name: '강변 산책 · 뉴팜 리버워크', sub: '둘만의 산책 · 나무 그늘 아래 강가 저택이 늘어선 조용한 주택가를 지나 강 위 보행로를 따라 시내 쪽으로 · 브리즈번 사람들이 사는 동네 분위기 · 정면에 스토리브리지와 스카이라인 · 리버워크 끝이 바로 Howard Smith Wharves · 예보 최고 26°C로 걷기 좋은 날씨', q: 'Brisbane Riverwalk New Farm', key: 'new_farm_riverwalk' },
        { t: '12:30', type: 'dining', name: '점심 · Howard Smith Wharves', sub: '스토리브리지 바로 아래 옛 부두 · 광둥 요리 Stanley(강가 테라스), 그리스 요리 Greca, 일식 Yoko Dining 중 선택 · 식사 뒤 Felons 양조장도 가능', addr: '5 Boundary St, Brisbane City', q: 'Howard Smith Wharves Brisbane', site: 'https://howardsmithwharves.com/', key: 'hsw_stanley_greca', menu: 'hsw_stanley_greca', st: 'need', note: '3명 12:30 예약(Stanley 또는 Greca). 호스트는 여기서 합류.' },
        { t: '14:00', type: 'car', name: 'Howard Smith Wharves에서 승차 · 호텔로', sub: 'Boundary St 쪽 승차 · 호텔까지 차로 약 5–10분', q: 'Howard Smith Wharves Brisbane' },
        { t: '14:30', type: 'hotel', name: '호텔 휴식 · 자유 시간', sub: '수영장 · 낮잠 · 원하면 둘이서 다리 건너 사우스뱅크 꽃 아치길과 GOMA', q: 'The Star Grand Brisbane, Queens Wharf', key: 'star_grand_brisbane' },
        { pick: 'bne', when: '14:30–17:00 · 오후' },
        { via: 'walk', text: '호텔 → SUUM 도보 약 10분 (Charlotte St)', mode: 'walking' },
        { t: '17:30', type: 'dining', name: 'SUUM · 한식 오마카세', sub: 'The Fat Duck·Disfrutar 출신 셰프 앤디 최 · 콘크리트 카운터를 둘러싼 16석 · 약 14코스 · 막걸리·약주·청주 또는 프랑스·호주 와인 페어링(3잔·5잔) · 간판 없는 검은 문 안쪽 · 약 3시간', addr: '119 Charlotte St, Brisbane City', q: 'SUUM Restaurant 119 Charlotte Street Brisbane', tel: '+61 7 3865 8468', site: 'https://www.suumrestaurant.com/', ig: 'https://www.instagram.com/suum_brisbane/', key: 'suum', menu: 'suum', st: 'need', note: '17:30 회차 3명 빈자리 확인(11/12, SevenRooms). 와인 페어링 요청(풀바디 레드).' },
        { via: 'walk', text: 'SUUM → 호텔 도보 약 10분', mode: 'walking' },
        { t: '20:45', type: 'pin', name: 'Sky Deck · 브리즈번 야경', sub: '호텔 위 약 100m 높이의 전망 데크 · 강과 스토리브리지, 시내 불빛 360도 · 바에서 한 잔', q: 'Sky Deck Queens Wharf Brisbane', key: 'sky_deck_brisbane' },
        { t: '21:30', type: 'pin', opt: true, name: '카지노 · The Star Brisbane', sub: '같은 건물 · 원하는 만큼만', q: 'The Star Grand Brisbane, Queens Wharf', key: 'star_casino_bne' },
        { t: '22:30', type: 'hotel', name: '호텔 · 짐 정리', sub: '내일 05:10 출발', q: 'The Star Grand Brisbane, Queens Wharf', key: 'star_grand_brisbane' }
      ],
      notes: '11/12 변경: 와이너리·론파인 대신 뉴팜 파크 마켓 → 파워하우스 맥주 → 리버워크 → Howard Smith Wharves 점심. 낮엔 두 분 데이트, 호스트는 하차·픽업만.'
    },
    {
      id: 'd22', cover: 'biz_class_787', coverCap: '대한항공 프레스티지', date: '2026-11-22', dow: '일', n: 7, city: '귀국', tz: 'Australia/Brisbane', tzLabel: '퀸즐랜드 시각 · 한국 +1시간',
      wx: [{ lo: 19, hi: 27, sky: '대체로 맑음', rain: '40%' }],
      title: '브리즈번 → 인천',
      intro: '08:40 출발편이라 새벽에 움직입니다. 조식은 공항 라운지에서 하고 같은 날 저녁 인천에 닿습니다.',
      stay: { name: '인천 도착', sub: '추가 숙박 없음' },
      bring: ['여권 · 탑승권(휴대폰)', '면세 환급(TRS): 영수증과 산 물건은 기내 가방에(출국심사 뒤 환급)', '인천 도착 저녁은 쌀쌀할 수 있으니 겉옷은 기내에'],
      items: [
        { t: '05:10', type: 'car', name: '호텔 출발 · 호스트 차량', sub: '익스프레스 체크아웃 · 조식은 라운지에서', q: 'The Star Grand Brisbane, Queens Wharf', note: '호텔에 05:10 출발·익스프레스 체크아웃 요청함.' },
        { via: 'car', text: '브리즈번 국제선 터미널까지 차량 약 20–30분', mode: 'driving' },
        { t: '05:40', type: 'plane', name: '브리즈번 공항 국제선 · 대한항공 체크인', sub: '출발 3시간 전 · 프레스티지 카운터 · 수하물 1인 2개 · TRS 환급은 출국심사 뒤 · 라운지', q: 'Brisbane Airport International Terminal', key: 'bne_airport', st: 'ok' },
        { t: '08:40', type: 'plane', name: 'KE408 브리즈번 → 인천', sub: '10시간 25분 · 보잉 787-9 · 프레스티지', key: 'biz_class_787', st: 'ok', note: '21일 → 22일로 날짜 변경 완료(11/9). 좌석 재지정 확인.' },
        { t: '18:05', type: 'plane', name: '인천공항 제2터미널 도착', sub: '같은 날 저녁 · 한국 시각', q: 'Incheon International Airport Terminal 2', key: 'icn_t2', tz: 'Asia/Seoul' }
      ]
    }
  ],
  flights: [
    { date: '11월 15일(일)', code: 'KE5001 · 아시아나 OZ601 운항', route: '인천 T2 → 시드니 T1', time: '20:00 → 다음 날 08:20', dur: '10시간 20분', cls: '프레스티지(비즈니스)', bag: '1인 2개', st: 'ok' },
    { date: '11월 18일(수)', code: 'VA1283 버진 오스트레일리아', route: '시드니 T2 → 해밀턴 아일랜드', time: '12:40 → 14:10 (퀸즐랜드 시각)', dur: '2시간 30분 · 737-800', cls: '비즈니스 · 두 분 1D·1F 나란히', bag: '위탁 수하물에 골프백 포함 · 좌석 지정 완료', st: 'ok' },
    { date: '11월 20일(금)', code: 'VA1496 버진 오스트레일리아', route: '해밀턴 아일랜드 → 브리즈번 국내선', time: '12:40 → 14:15', dur: '1시간 35분 · 737-800', cls: '비즈니스 · 두 분 1A·1C 나란히', bag: '위탁 수하물에 골프백 포함 · 좌석 지정 완료', st: 'ok' },
    { date: '11월 22일(일)', code: 'KE408 대한항공', route: '브리즈번 국제선 → 인천 T2', time: '08:40 → 18:05', dur: '10시간 25분 · 787-9', cls: '프레스티지(날짜 변경 완료 · 좌석 재지정 확인)', bag: '1인 2개', st: 'ok' }
  ],
  hotels: [
    { name: 'Capella Sydney', dates: '11월 16일(월) – 18일(수) · 2박', addr: '24 Loftus St, Sydney NSW 2000', tel: '+61 2 9071 5000', q: 'Capella Sydney, 24 Loftus Street Sydney', key: 'capella_sydney', sub: '서큘러키·오페라하우스 도보권 · 1912년 교육부 건물' },
    { name: 'Reef View Hotel · Superior Presidential Suite', dates: '11월 18일(수) 14:00 – 20일(금) 10:00 · 2박', addr: '12 Resort Drive, Hamilton Island QLD 4803', tel: '+61 7 4946 9999', q: 'Reef View Hotel, Hamilton Island', key: 'reef_view_suite', sub: '캣츠아이 비치 앞 · 2층 스위트(침실 2·욕실 2·전용 플런지 풀) · 조식 포함(Sails 또는 Pool Terrace) · 공항 왕복 VIP 차량 · 4인승 버기 · 무알코올 미니바 · 비치 스포츠 장비 · 예약 1800 370 800' },
    { name: 'The Star Grand Brisbane · River Suite', dates: '11월 20일(금) – 22일(일) · 2박', addr: 'Queen\'s Wharf, 33 William St, Brisbane City QLD 4000', q: 'The Star Grand Brisbane, Queens Wharf', key: 'star_grand_brisbane', sub: '브리즈번강 앞 신축 5성 · 카지노·Sky Deck 같은 건물 · Exhibition 도보 10분 · 공항까지 차량 20–30분' }
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
      ['결제', '카드 탭 결제가 기본 · 현금은 거의 필요 없음 · 팁은 필수 아님'],
      ['전원', '230V · I타입 플러그(한국 플러그는 어댑터 필요)'],
      ['통신', '로밍 또는 eSIM · 해밀턴 아일랜드도 4G/5G 가능 · 호텔 Wi-Fi 무료']
    ]},
    { h: '날씨 · 복장(11월 중순 평년)', rows: [
      ['시드니', '낮 23–26°C · 밤 15–17°C · 바람 · 가벼운 겉옷'],
      ['해밀턴 아일랜드', '낮 28–30°C · 습함 · 자외선 매우 강함 · 오후 소나기 가능'],
      ['브리즈번', '낮 27–29°C · 저녁은 가벼운 긴팔이면 충분'],
      ['벌레 · 바다', '섬에서는 저녁에 모기·샌드플라이 — 기피제와 긴 소매 · 11월부터 해파리 철이라 바다 수영은 넣지 않았고 수영은 스위트 플런지 풀과 호텔 풀에서']
    ]},
    { h: '골프', rows: [
      ['복장', '칼라 셔츠 · 긴바지 또는 테일러드 쇼츠 · 소프트 스파이크 골프화 · 청바지 불가'],
      ['세인트 마이클', '11/17 11:51 티타임 · 드레스코드가 엄격합니다 · 카트 A$50 · 바닷가 파72'],
      ['Hamilton Island Golf Club', '11/19 08:30 티타임 예약 완료 · 08:00 페리(15분 전 체크인) · 페리와 버기 포함 · 클럽 대여 1인 A$70 · 운동화 가능']
    ]},
    { h: '이동', rows: [
      ['시드니 · 브리즈번', '우버·택시 · 골프백이 있는 날은 큰 차량 예약'],
      ['해밀턴 아일랜드', '일반 차 없음 · 스위트에 포함된 4인승 버기(야간 운전은 천천히, 충전 6시간) · 무료 아일랜드 셔틀: 그린 라인 리조트 센터↔마리나 10–12분 간격 07:00–22:45, 블루 라인 섬 전체 40분 순환 · 공항 왕복은 스위트 VIP 차량'],
      ['걷기', '시드니 호텔에서 오페라하우스 15–20분, 더록스 10분 · 해밀턴에서는 호텔 → Catseye Pool Club 5–10분, 리조트 센터 3분']
    ]}
  ]
  ,
  picks: {
    syd: {
      title: '시드니 · Capella 주변',
      base: 'Capella Sydney에서 걸어서',
      items: [
        { key: 'p_syd_hacienda', cat: 'bar', name: 'Hacienda (Pullman Quay Grand)', walk: '도보 5분', date: true, sub: 'Pullman Quay Grand 호텔의 라운지 바(옛 Hyde Hacienda). 2025년 리뉴얼로 흙빛 톤과 초록 식물의 차분한 분위기가 됐고, 창밖은 서큘러키 하버', tip: '사진: 창가 자리에서 서큘러키 하버를 배경으로', q: 'Hacienda Bar Pullman Quay Grand Sydney', hours: { '월': '15:00–22:00', '화': '15:00–22:00', '수': '15:00–23:00' }, site: 'https://www.haciendasydney.com.au/' },
        { key: 'p_syd_larenaissance', cat: 'cafe', name: 'La Renaissance Patisserie', walk: '도보 7분', sub: '더록스의 프랑스 파티세리. 마카롱과 케이크, 안뜰 정원 테이블', tip: '사진: 돌담 안뜰 테이블에 마카롱', q: 'La Renaissance Patisserie The Rocks Sydney', hours: { '월': '07:00–18:00', '화': '07:00–18:00', '수': '07:00–18:00' }, site: 'https://www.larenaissance.com.au/', ig: 'https://www.instagram.com/la_renaissance_patisserie/' },
        { key: 'p_syd_mca_cafe', cat: 'cafe', name: 'MCA 카페', walk: '도보 7분', sub: '현대미술관 1층 카페(MCA Cafe at Tallawoladah). 미술관 관람은 무료 · 화요일은 미술관과 카페 모두 휴관', tip: '사진: 미술관 앞 서큘러키 물가에서 오페라하우스', q: 'MCA Cafe Museum of Contemporary Art Sydney', hours: { '월': '10:00–17:00', '화': '휴무', '수': '10:00–17:00' }, site: 'https://www.mca.com.au/visitor-information/eat-and-drink/' },
        { key: 'p_syd_teacosy', cat: 'cafe', name: 'The Tea Cosy', walk: '도보 7분', sub: '더록스 옛 오두막의 아일랜드식 티룸. 스콘과 잎차', q: 'The Tea Cosy The Rocks Sydney', hours: { '월': '09:00–16:30', '화': '09:00–16:30', '수': '09:00–16:30' }, site: 'https://www.theteacosy.com.au/', ig: 'https://www.instagram.com/theteacosy/' },
        { key: 'p_syd_grounds_city', cat: 'cafe', name: 'The Grounds of the City', walk: '도보 15분', sub: '빈티지 가구, 가죽 소파, 짙은 원목으로 꾸민 시내 카페. 인기 명소 The Grounds of Alexandria의 시내점', tip: 'QVB 쇼핑과 묶기 좋습니다', q: 'The Grounds of the City 500 George Street Sydney', hours: { '월': '07:00–21:00', '화': '07:00–21:00', '수': '07:00–21:00' }, site: 'https://thegrounds.com.au/dine-in/the-city', ig: 'https://www.instagram.com/thegrounds/' },
        { key: 'p_syd_industry_beans', cat: 'cafe', name: 'Industry Beans · York St', walk: '도보 12분', sub: '아치형 창과 밝은 원목, 하얀 공간의 커피 바. 커피 맛으로도 손꼽힙니다', q: 'Industry Beans York Street Sydney', hours: { '월': '07:00–15:30', '화': '07:00–15:30', '수': '07:00–15:30' }, site: 'https://www.industrybeans.com/pages/york-st-cafe', ig: 'https://www.instagram.com/industrybeans/' },
        { key: 'p_syd_henry_deane', cat: 'bar', name: 'Henry Deane', walk: '도보 15–20분', date: true, sub: 'Hotel Palisade 꼭대기의 유리 라운지. 하버브리지가 코앞에 있습니다', tip: '해 질 녘(19:30 전후)에 가세요', q: 'Henry Deane Hotel Palisade Millers Point', hours: { '월': '휴무', '화': '16:00–22:00', '수': '16:00–22:00' }, site: 'https://hotelpalisade.com.au/henrydeane', ig: 'https://www.instagram.com/henrydeanelounge/' },
        { key: 'p_syd_maybe_sammy', cat: 'bar', name: 'Maybe Sammy', walk: '도보 7분', date: true, sub: '1950년대 할리우드 호텔 바 콘셉트. 세계 베스트 바 목록 단골', q: 'Maybe Sammy Harrington Street The Rocks', hours: { '월': '휴무 추정 · 확인 필요', '화': '17:00–24:00', '수': '17:00–24:00' }, site: 'https://www.maybesammy.com/', ig: 'https://www.instagram.com/maybe_sammy_sydney/' },
        { key: 'p_syd_apollonia', cat: 'bar', name: 'Apollonia', walk: '도보 3분', date: true, sub: '사암을 깎은 동굴 같은 지하 바. 촛불, 붉은 가죽, 시칠리아 분위기', q: 'Apollonia Hinchcliff House Sydney', hours: { '월': '16:00–24:00', '화': '16:00–24:00', '수': '16:00–24:00' }, site: 'https://apollonia.sydney/', ig: 'https://www.instagram.com/apolloniabar/' },
        { key: 'p_syd_bar1880', cat: 'bar', name: 'Bar 1880 · The Press Room', walk: '도보 3분', sub: '시드니에서 가장 오래된 건물 중 하나의 2층. 벨벳 의자와 클래식 칵테일', q: 'Bar 1880 Bulletin Place Sydney', hours: { '월': '휴무', '화': '17:00–24:00', '수': '17:00–24:00' }, site: 'https://www.bar1880.com/' },
        { key: 'p_syd_glenmore', cat: 'bar', name: 'Glenmore Hotel 루프탑', walk: '도보 10분', sub: '더록스 옛 펍의 옥상. 하버브리지와 오페라하우스가 같이 보이는 캐주얼한 자리', q: 'Glenmore Hotel Cumberland Street The Rocks', hours: { '월': '12:00–24:00', '화': '12:00–24:00', '수': '12:00–24:00' }, site: 'https://theglenmore.com.au/', ig: 'https://www.instagram.com/theglenmore/' },
        { key: 'p_syd_cafe_sydney', cat: 'food', name: 'Cafe Sydney', walk: '도보 3분', date: true, sub: '세관 건물(Customs House) 옥상 레스토랑. 서큘러키와 하버브리지 전망', q: 'Cafe Sydney Customs House 31 Alfred Street', hours: { '월': '12:00–22:00', '화': '12:00–22:00', '수': '12:00–22:00' }, site: 'https://cafesydney.com/', ig: 'https://www.instagram.com/cafesydney/' },
        { key: 'p_syd_the_rocks', cat: 'sight', name: '더록스 골목길', walk: '도보 5분', sub: '1800년대 돌길, 사암 건물, 오래된 펍. 그냥 걸어도 사진이 됩니다', q: 'The Rocks Sydney', hours: { '월': '상시 개방', '화': '상시 개방', '수': '상시 개방' }, site: 'https://www.therocks.com/', ig: 'https://www.instagram.com/therocks/' },
        { key: 'p_syd_dawes_point', cat: 'sight', name: '도스 포인트 파크', walk: '도보 15분', date: true, sub: '하버브리지 바로 아래 공원. 다리와 오페라하우스가 한 프레임에 들어오는 시드니 대표 사진 자리', tip: '사진: 다리 기둥 옆 물가에서 오페라하우스 방향', q: 'Dawes Point Park Sydney', hours: { '월': '상시 개방', '화': '상시 개방', '수': '상시 개방' }, site: 'https://www.therocks.com/Venues/Dawes-Point-Park-(Tar-ra)' },
        { key: 'p_syd_observatory_hill', cat: 'sight', name: '옵저버토리 힐', walk: '도보 15분', date: true, sub: '언덕 위 공원과 옛 천문대. 현지인이 아는 하버브리지 일몰 명소', q: 'Observatory Hill Sydney', hours: { '월': '상시 개방', '화': '상시 개방', '수': '상시 개방' } },
        { key: 'p_syd_pylon_lookout', cat: 'sight', name: '파일론 전망대 · BridgeMuseum', walk: '도보 15분', sub: '하버브리지 기둥 꼭대기까지 계단 약 200개. 30분이면 다리 위 360도 전망 · 유료 입장 · 마지막 입장 17:00', q: 'Pylon Lookout Sydney Harbour Bridge', hours: { '월': '09:00–18:00', '화': '09:00–18:00', '수': '09:00–18:00' }, site: 'https://www.bridgemuseum.com.au/plan-your-visit', ig: 'https://www.instagram.com/bridgemuseumsydney' },
        { key: 'p_syd_barangaroo', cat: 'sight', name: '바랑가루 리저브', walk: '도보 20분', sub: '바다로 튀어나온 곶을 도는 사암 산책로. 새로 개발된 수변 지역', q: 'Barangaroo Reserve Sydney', hours: { '월': '상시 개방', '화': '상시 개방', '수': '상시 개방' }, site: 'https://www.barangaroo.com/visit/barangaroo-reserve', ig: 'https://www.instagram.com/barangaroosydney/' },
        { key: 'p_syd_luxury_westfield', cat: 'shop', name: '명품 거리 · Westfield Sydney', walk: '도보 10–15분', sub: 'Chanel(호주 최대 매장) · Hermès · Cartier(King St·Castlereagh St) · LV(George St) · Gucci·Prada·Celine(Westfield)', q: 'Westfield Sydney Pitt Street Mall', hours: { '월': '09:30–19:00', '화': '09:30–19:00', '수': '09:30–19:00' }, site: 'https://www.westfield.com.au/sydney' },
        { key: 'p_syd_qvb', cat: 'shop', name: 'QVB · Strand Arcade', walk: '도보 15분', sub: '1890년대 빅토리아풍 아케이드. 건물 안이 사진 명소이고 호주 디자이너 브랜드가 모여 있습니다', q: 'Queen Victoria Building Sydney', hours: { '월': '09:00–18:00', '화': '09:00–18:00', '수': '09:00–18:00' }, site: 'https://www.qvb.com.au/', ig: 'https://www.instagram.com/theqvb' },
        { key: 'im_lingerie', cat: 'shop', name: 'IM Lingerie', walk: '도보 12분', date: true, sub: '유럽 명품 란제리·실크 잠옷 부티크. La Perla · Lise Charmel · Aubade · 월–수·금 17:30, 목 20:00, 주말 16:00까지', tip: '$300 이상이면 출국 때 면세 환급', q: 'IM Lingerie Stockland Piccadilly Sydney', tel: '+61 2 9232 0088', hours: { '월': '09:00–17:30', '화': '09:00–17:30', '수': '09:00–17:30' }, site: 'https://imlingerie.com.au/', ig: 'https://www.instagram.com/imlingerie/' },
      ]
    },
    ham: {
      title: '해밀턴 아일랜드 · Reef View 주변',
      base: '호텔에서 걷거나 버기로',
      items: [
        { key: 'p_ham_beach_pavilion', cat: 'cafe', name: 'Beach Pavilion Kiosk', walk: '도보 3분', sub: '부겐빌레아 수영장 옆, 캣츠아이 비치를 내려다보는 키오스크. 음료 들고 해변으로', tip: '사진: 분홍 부겐빌레아와 바다', q: 'Beach Pavilion Hamilton Island', hours: { '수': '11:00–16:00', '목': '11:00–16:00', '금': '11:00–16:00' }, site: 'https://www.hamiltonisland.com.au/bars-and-clubs/beach-pavilion-kiosk' },
        { key: 'p_ham_marina_cafe', cat: 'cafe', name: 'Marina Cafe', walk: '버기 5분', sub: '요트가 가득한 마리나 앞 커피·스무디', q: 'Marina Village Hamilton Island', hours: { '수': '06:30–14:00', '목': '06:30–14:00', '금': '06:30–14:00' }, site: 'https://www.hamiltonisland.com.au/cafes-and-takeaway/marina-cafe' },
        { key: 'p_ham_bobs_bakery', cat: 'cafe', name: "Bob's Bakery", walk: '버기 5분', sub: '섬 사람들이 다 아는 빵집. 미트파이, 소시지롤, 단 번', q: "Bob's Bakery Hamilton Island", hours: { '수': '06:30–15:00', '목': '06:30–15:00', '금': '06:30–15:00' }, site: 'https://www.hamiltonisland.com.au/cafes-and-takeaway/bobs-bakery' },
        { key: 'p_ham_bommie_deck', cat: 'bar', name: 'Bommie Deck', walk: '버기 5분', date: true, sub: '요트클럽 물 위 데크의 늦은 오후 바. 바다거북이 보이기도 합니다', tip: '해 지기 전 17:00–18:20', q: 'Hamilton Island Yacht Club', hours: { '수': '16:00–20:00', '목': '16:00–20:00', '금': '16:00–20:00' }, site: 'https://www.hamiltonisland.com.au/bars-and-clubs/bommie-deck' },
        { key: 'p_ham_sails_sunbed', cat: 'bar', name: 'Sails 선베드 다이닝', walk: '도보 3분', date: true, sub: '수영장 옆 지정 선베드에서 음식과 음료를 받는 방식. 둘만의 해변 오후', q: 'Sails Restaurant Hamilton Island', hours: { '수': '09:00–17:00', '목': '09:00–17:00', '금': '09:00–17:00' }, site: 'https://www.hamiltonisland.com.au/swimming-pools/sails-sunbed-series' },
        { key: 'p_ham_island_bar', cat: 'bar', name: 'Island Bar', walk: '도보 3분', sub: '리조트 수영장의 초가지붕 스윔업 바', q: 'Reef View Hotel Hamilton Island', hours: { '수': '11:00–16:00', '목': '11:00–16:00', '금': '11:00–16:00' }, site: 'https://www.hamiltonisland.com.au/bars-and-clubs/island-bar' },
        { key: 'p_ham_romanos', cat: 'food', name: "Romano's", walk: '버기 5분', date: true, sub: '마리나의 로맨틱한 이탈리안 저녁. Catseye Pool Club 대안', q: "Romano's Hamilton Island", hours: { '수': '17:00–late', '목': '17:00–late', '금': '17:00–late' }, site: 'https://www.hamiltonisland.com.au/restaurants/romanos' },
        { key: 'p_ham_coca_chu', cat: 'food', name: 'coca chu', walk: '도보 5분', sub: '캣츠아이 비치를 내려다보는 동남아 호커 스타일 저녁', q: 'coca chu Hamilton Island', hours: { '수': '12:00–14:30, 17:00–late', '목': '12:00–14:30, 17:00–late', '금': '12:00–14:30, 17:00–late' }, site: 'https://www.hamiltonisland.com.au/restaurants/coca-chu' },
        { key: 'p_ham_manta_ray', cat: 'food', name: 'Manta Ray', walk: '버기 5분', sub: '마리나 앞 그릭 메제와 해산물, 점심·저녁', q: 'Manta Ray Hamilton Island', hours: { '수': '휴무', '목': '휴무', '금': '17:00–late' }, site: 'https://www.hamiltonisland.com.au/restaurants/manta-ray' },
        { key: 'p_ham_flat_top_hill', cat: 'sight', name: 'Flat Top Hill 전망대', walk: '1.2km · 호텔 앞 출발', date: true, sub: '호텔 앞 리조트 트레일 입구에서 오르는 가장 가까운 전망대. 남북으로 바다와 해변', tip: '일몰 추천', q: 'Flat Top Hill Lookout Hamilton Island', hours: { '수': '일출–일몰', '목': '일출–일몰', '금': '일출–일몰' }, site: 'https://www.hamiltonisland.com.au/nature-and-wildlife/bushwalking', ig: 'https://www.instagram.com/hamiltonisland/' },
        { key: 'catseye_beach', cat: 'sight', name: '캣츠아이 비치 썰물 산책', walk: '호텔 앞', sub: '썰물 때 모래톱이 넓게 드러납니다. 이른 아침도 좋습니다', q: 'Catseye Beach Hamilton Island', hours: { '수': '상시 개방', '목': '상시 개방', '금': '상시 개방' }, site: 'https://www.hamiltonisland.com.au/community-and-development/community-facilities/parks-ovals-beaches', ig: 'https://www.instagram.com/hamiltonisland/' },
        { key: 'p_ham_hesperus', cat: 'sight', name: 'Hesperus 잔디밭', walk: '버기 5분', sub: '마리나를 마주한 잔디밭. 해 질 녘 요트 실루엣', q: 'Hesperus Lawn Hamilton Island', hours: { '수': '상시 개방', '목': '상시 개방', '금': '상시 개방' }, ig: 'https://www.instagram.com/hamiltonisland/' },
        { key: 'p_ham_escape_beach', cat: 'sight', name: 'Escape Beach 자이언트 해먹', walk: '3.3km · 보통', sub: '바위 뒤에 숨은 해변의 대형 해먹. 사진 명소', q: 'Escape Beach Hamilton Island', hours: { '수': '일출–일몰', '목': '일출–일몰', '금': '일출–일몰' }, site: 'https://www.hamiltonisland.com.au/nature-and-wildlife/bushwalking', ig: 'https://www.instagram.com/hamiltonisland/' },
        { key: 'p_ham_coral_cove', cat: 'sight', name: 'Coral Cove 자이언트 그네', walk: '3.1km · 보통', sub: '바다를 향한 대형 그네. 사람이 적습니다', q: 'Coral Cove Hamilton Island', hours: { '수': '일출–일몰', '목': '일출–일몰', '금': '일출–일몰' }, site: 'https://www.hamiltonisland.com.au/nature-and-wildlife/bushwalking', ig: 'https://www.instagram.com/hamiltonisland/' },
        { key: 'p_ham_passage_peak', cat: 'sight', name: 'Passage Peak 일출', walk: '2.7km · 계단 많음', sub: '섬에서 가장 높은 곳. 휘트선데이 섬들이 한눈에', q: 'Passage Peak Hamilton Island', hours: { '수': '일출–일몰', '목': '일출–일몰', '금': '일출–일몰' }, site: 'https://www.hamiltonisland.com.au/nature-and-wildlife/bushwalking', ig: 'https://www.instagram.com/hamiltonisland/' }
      ]
    },
    bne: {
      title: '브리즈번 · The Star Grand 주변',
      base: 'Queen\'s Wharf에서 걸어서',
      items: [
        { key: 'p_bne_belle_epoque', cat: 'cafe', name: 'Belle Époque', walk: '도보 15분', date: true, sub: 'Emporium Hotel South Bank 1층의 파리풍 파티세리. 하이티도 됩니다', q: 'Belle Epoque Emporium Hotel South Bank', hours: { '금': '06:00–15:00', '토': '06:30–15:00' }, site: 'https://www.emporiumhotels.com.au/bars-dining/belle-epoque', ig: 'https://www.instagram.com/emporiumhotels/' },
        { key: 'p_bne_french_exit', cat: 'cafe', name: 'The French Exit', walk: '도보 10분', date: true, sub: '2026년 문을 연 파리풍 비스트로. 파티시에 Arthur Carré의 디저트(파리 브레스트)가 명물', q: 'The French Exit Brisbane', hours: { '금': '11:30–late', '토': '11:30–late' }, site: 'https://anyday.com.au/the-french-exit-venue-page', ig: 'https://www.instagram.com/thefrenchexit.restaurant/' },
        { key: 'p_bne_goma_bistro', cat: 'cafe', name: 'GOMA Bistro', walk: '도보 15분', sub: '강가 현대미술관 안 레스토랑·카페. 전시 보고 이어가기 좋습니다', q: 'GOMA Bistro South Brisbane', hours: { '금': '09:00–15:00', '토': '09:00–16:00' }, site: 'https://www.qagoma.qld.gov.au/visit/eat-and-drink', ig: 'https://www.instagram.com/qagoma/' },
        { key: 'p_bne_lisboa', cat: 'cafe', name: 'Lisboa Caffè', walk: '도보 20분', sub: '사우스브리즈번의 작은 포르투갈 빵집. 에그타르트', q: 'Lisboa Caffe 58 Hope Street South Brisbane', hours: { '금': '07:00–15:00', '토': '07:00–15:00' }, site: 'https://www.lisboacaffe.com/', ig: 'https://www.instagram.com/lisboacaffe/' },
        { key: 'p_bne_denim_co', cat: 'cafe', name: 'Denim Co.', walk: '도보 15분', sub: '사우스뱅크의 오래된 디저트 카페. 저녁엔 디저트 바', q: 'Denim Co Little Stanley Street South Brisbane', hours: { '금': '06:00–17:00', '토': '06:00–17:00' }, site: 'https://www.denimcocafe.com/', ig: 'https://www.instagram.com/denimco/' },
        { key: 'p_bne_le_royale', cat: 'bar', name: 'Le Royale', walk: '도보 10분', date: true, sub: 'The French Exit 2층의 아르데코 재즈바(2026). 무알코올 칵테일도 수준급', tip: '20일 Exhibition 뒤 한 잔으로 딱', q: 'Le Royale Brisbane', hours: { '금': '15:00–late', '토': '14:00–late' }, site: 'https://anyday.com.au/le-royale', ig: 'https://www.instagram.com/le.royale.bar/' },
        { key: 'p_bne_hsw_bars', cat: 'bar', name: 'Howard Smith Wharves', walk: '리버워크 25분', sub: '스토리브리지 아래 옛 부두. 양조장 Felons Barrel Hall과 강가 바들', q: 'Howard Smith Wharves Brisbane', hours: { '금': '상시 개방', '토': '상시 개방' }, site: 'https://howardsmithwharves.com/', ig: 'https://www.instagram.com/howardsmithwharves/' },
        { key: 'p_bne_fish_lane', cat: 'bar', name: 'Fish Lane', walk: '도보 20분', sub: '벽화 골목에 바와 식당이 모인 사우스브리즈번 거리. Five Sisters 카페·바', q: 'Fish Lane South Brisbane', hours: { '금': '상시 개방', '토': '상시 개방' }, site: 'https://visit.brisbane.qld.au/things-to-do/inner-city/history-and-heritage/fish-lane-fb9e' },
        { key: 'p_bne_arbour', cat: 'sight', name: '사우스뱅크 부겐빌레아 아치길', walk: '도보 10분', date: true, sub: '1km 길이 꽃 아치 산책로. 브리즈번 대표 사진 자리', tip: '호텔 → Neville Bonner 다리 → 아치길', q: 'South Bank Arbour Brisbane', hours: { '금': '05:00–24:00', '토': '05:00–24:00' }, site: 'https://www.visitsouthbank.com.au/', ig: 'https://www.instagram.com/visitsouthbank/' },
        { key: 'p_bne_streets_beach', cat: 'sight', name: 'Streets Beach · 네팔 파고다', walk: '도보 10분', sub: '도심 한가운데 인공 해변과 숲속 목조 파고다', q: 'Nepal Peace Pagoda South Bank Brisbane', hours: { '금': '07:30–17:00', '토': '07:30–17:00' }, site: 'https://www.visitsouthbank.com.au/places/nepalese-pagoda', ig: 'https://www.instagram.com/visitsouthbank/' },
        { key: 'p_bne_goma', cat: 'sight', name: 'GOMA 현대미술관', walk: '도보 15분', sub: '대형 설치미술이 많은 무료 미술관. 사진이 잘 나옵니다', q: 'Gallery of Modern Art Brisbane', hours: { '금': '10:00–17:00', '토': '10:00–17:00' }, site: 'https://www.qagoma.qld.gov.au/', ig: 'https://www.instagram.com/qagoma/' },
        { key: 'p_bne_kurilpa', cat: 'sight', name: 'Kurilpa 다리 야경', walk: '도보 15분', date: true, sub: '밤이면 색이 바뀌는 보행교. 강 건너 스카이라인', q: 'Kurilpa Bridge Brisbane', hours: { '금': '상시 개방', '토': '상시 개방' } },
        { key: 'p_bne_queens_gardens', cat: 'sight', name: '퀸즈 가든 · 옛 재무부 건물', walk: '도보 3분', sub: '호텔 바로 옆 헤리티지 거리. 밤 조명도 예쁩니다', q: 'Queens Gardens Brisbane', hours: { '금': '상시 개방', '토': '상시 개방' }, site: 'https://queenswharfbrisbane.com.au/maps/queens-gardens' },
        { key: 'p_bne_botanic', cat: 'sight', name: '시티 보태닉 가든 → 리버워크', walk: '도보 10분', sub: '오래된 무화과나무와 야자 숲, 강을 따라 걷는 길', q: 'City Botanic Gardens Brisbane', hours: { '금': '상시 개방', '토': '상시 개방' }, site: 'https://www.brisbane.qld.gov.au/things-to-see-and-do/council-venues-and-precincts/parks/city-botanic-gardens' },
        { key: 'p_bne_wilson_outlook', cat: 'sight', name: 'Wilson Outlook Reserve', walk: '도보 25분 · 차 5분', date: true, sub: '스토리브리지와 스카이라인이 한 장에 담기는 브리즈번 최고의 일몰 전망', q: 'Wilson Outlook Reserve Brisbane', hours: { '금': '상시 개방', '토': '상시 개방' }, site: 'https://brisbane.qld.gov.au/things-to-see-and-do/council-venues-and-precincts/parks/using-council-parks-for-activities-and-events/park-bookings-and-consents/wilson-outlook-reserve-park-booking-site' },
        { key: 'p_bne_city_hall', cat: 'sight', name: 'City Hall 시계탑', walk: '도보 10분', sub: '1930년대 시청사. 시계탑 전망대 무료', q: 'Brisbane City Hall Clock Tower', hours: { '금': '10:15–16:45', '토': '10:15–16:45' }, site: 'https://www.museumofbrisbane.com.au/', ig: 'https://www.instagram.com/museumofbrisbane/' },
        { key: 'p_bne_luxury', cat: 'shop', name: '명품 쇼핑 · Edward St / Queen St', walk: '도보 10분', sub: 'Chanel · LV · Hermès 등 브리즈번 명품 거리와 퀸 스트리트 몰', q: 'Edward Street Brisbane luxury', hours: { '금': '09:00–21:00', '토': '09:00–17:00' }, site: 'https://www.brisbane.qld.gov.au/libraries-venues-and-facilities/malls-and-precincts/queen-street-mall' }
      ]
    }
  }
};
