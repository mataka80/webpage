# Autorize Automation — GitHub Pages

이 디렉터리의 파일을 mataka80/webpage 저장소의 배포 루트에 배치합니다.

- index.html: 한국어 페이지
- en.html: 영어 페이지
- assets/: 이미지와 상담 요청서·이메일 전송 기능
- CNAME: www.arize.kr
- .nojekyll: 정적 파일을 그대로 제공

## Pages 배포
저장소 Settings → Pages → Deploy from a branch에서 실제 기본 브랜치와 /(root)를 선택합니다.
새 사이트가 준비된 다음 DNS를 바꿉니다. Pages에 www.arize.kr을 등록한 뒤 Hosting.kr에서 www CNAME을 mataka80.github.io로 설정합니다.
DNS와 HTTPS 인증 후 Enforce HTTPS를 켜고 실제 www.arize.kr에서 확인합니다.
현재 운영 중인 Sites 연결은 새 사이트 검증과 전환이 끝나기 전까지 유지합니다.
전환이 확인된 후 기존 Sites의 www.arize.kr 연결을 해제합니다. 기존 계정 이용이 끝나기 전에 이 단계를 완료해야 합니다.

## 문의 전송
수신 이메일은 seo.youngwook@gmail.com입니다.
FormSubmit을 통해 전송합니다. 수신함에 도착한 Activate Form 메일의 1회 인증이 필요합니다.
인증 완료 전에는 수신 성공을 보장할 수 없습니다. 전환 후 실제 문의 전송과 수신을 확인하세요.

## 편집
이 저장소를 본인의 GitHub 계정에서 관리하면 임시 ChatGPT 계정의 접근권한과 무관하게 파일을 수정하고 Pages에 배포할 수 있습니다.
다른 ChatGPT 계정에서 수정할 때는 해당 GitHub 저장소를 연결하거나 이 소스를 업로드해 수정한 뒤 저장소에 반영합니다.
