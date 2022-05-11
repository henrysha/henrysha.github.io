---
date created: 2022-05-05 00:52
category:
  - Gatsby.js
  - devlog
---

# Gatsby를 활용하여 블로그 만들기

## 블로그를 다시 만들어보자는 생각이 들었다.

호랑이 담배피던 시절, 네이버 블로그를 해본 적이 있었고, 티스토리도 계정만 파고 내버려 둔 적이 있지만, 개발 블로그는 중요하다는 생각을 개발자로 일하면서 점점 느끼고 있다.

퍼스널 브랜딩의 시대라고 하던가. 개발자에게 있어서 퍼스널 브랜딩은 곧 개발 블로그와 깃허브 포트폴리오라 하였다. 그런데 기업에서 개발하는 개발자의 숙명은, 사이드 프로젝트를 하지 않는 이상 깃허브는 텅텅 빌 수 밖에 없고, 그렇다고 사이드 프로젝트를 하자니, 시간이 없다. 회사 일 하기에도 바쁘고 그 외에도 컨설팅 / 강의 녹화등의 일을 진행중인지라, 개인 깃허브를 채우기엔 몸이 열개라도 모자랄 지경이다.

그래도 블로그는 한번 구축해놓으면 하루에 10분정도 끄적이면서 채워나갈 수 있고, 무엇보다 Github Pages를 통해서 블로그를 채워나간다면, 깃허브 잔디도 채울 수 있지 아니한가?

> 잔디 채우는 스트레스 넋두리
> https://medium.com/@henrysha/how-github-forces-you-to-work-on-a-side-project-d337c950ea8d

## Gatsby를 선택한 이유

Github Pages를 통해서 잔디도 채우고 블로그도 호스팅하고 일석 이조를 하기로 했으니, 이제 어떤 도구를 이용해 블로그를 만들지를 골라야한다.

깃허브에서 공식적으로 밀고있는 툴은 Jekyll (Ruby 기반) 이 있고, 요즘 가장 핫한 툴은 Gatsby가 있다. Gatsby는 React 기반 Static Site Generator 프레임워크로, `프론트엔드 === React`가 되어버린 2022년도에 블로그를 만들기에 최적의 프레임워크다. 플러그인도 많고, 템플릿도 잘되어있고, 커뮤니티도 크다.

그런데 템플릿을 쓰자니, 또 이 개발자의 혼(?) 이 가만 있지를 않는다. 기존에 Jekyll 블로그를 잠깐 만들었다가 날린 적이 있었는데, 템플릿을 써서 만들었다가 커스텀하기가 귀찮아서 얼마 못쓰고 그냥 날렸었다. 남이 만들어놓은 코드를 읽고 이해하고 커스텀하는 수고보단, 내가 처음부터 만들어 나가는게 더 재밌고, 덜 어려운 것 같다.

그래서 그냥 [gatsby-cli](https://www.gatsbyjs.com/docs/reference/gatsby-cli/)를 활용해서 `gatsby new` 커맨드부터 시작하기로 했다.

내 설정값은 다음과 같다.
![Gatsby new config](./attachments/Pasted%20image%2020220505005138.png)

Google Analytics 플러그인은 처음부터 등록하지는 않았는데, google analytics plugin 설명에 다음과 같이 나와있다.

> This plugin uses Google’s `analytics.js` file under the hood. Google has a [guide recommending users upgrade to `gtag.js` instead](https://developers.google.com/analytics/devguides/collection/upgrade/analyticsjs). There is another plugin [`gatsby-plugin-gtag`](https://gatsbyjs.com/plugins/gatsby-plugin-google-gtag/) which uses `gtag.js` and we recommend it.
> https://www.gatsbyjs.com/plugins/gatsby-plugin-google-analytics/#install

즉 `gatsby-plugin-gtag`를 쓰라는 거다. 우선 프로젝트부터 생성하고, Google Analytics 계정을 다시 살린 다음, gtag 플러그인을 활용해서 달아주기로 했다.

댓글은 [utterance.es](https://utteranc.es/) 를 사용할 예정이다. 어짜피 개발 블로그고, 타겟 독자층인 개발자들은 다 깃허브 하나쯤은 있을테니까 문제 없으리라 생각했다.

도메인은 굳이 따로 팔 이유 있을까 싶다. github page 기본 domain도 충분할 것 같다. 도메인도 돈이고 1년에 몇만원 안한다고 해도, `github.io` 도메인도 나쁘지 않지 아니한가?

광고도 달긴 해야하는데, 그건 조금 더 블로그가 성장하면 고민해봐야겠다. 아직은 너무 초반이고, 블로그에 광고가 들어가야 수익이 나지만, 또 이게 광고가 들어간 블로그는 퀄리티가 떨어져보이더라. 블로그로 수익을 본격적으로 내려면 미디엄같은 곳에 포스팅하거나, 광고를 달아야하는데, 이게 참 딜레마다.

한글 포스팅만 Github Pages에 올리고, 영문 포스팅은 [Medium](https://medium.com/@henrysha)에 올릴까 싶었다. 아무래도 미디엄은 영문 독자들이 많은 플랫폼이라서, 영문 포스팅을 미디엄에 올려야 독자도 더 많이 몰리지 않을까. 근데 또 개발블로그인데, 한글 포스팅만 있는 블로그를 만들자니, 아쉽다.

그래서 그냥 Github Pages에 i-18n을 적용해서, 한글 / 영문 포스팅 둘다 올릴 수 있게 작업할 생각이다. 그리고 영문 포스팅은 Medium에도 동일하게 올려야지.

Medium도 i-18n 친화적이 됐으면 좋겠다. Medium만큼 수익성 있으면서 광고 없이 깔끔하게 운영 할 수 있는 블로깅 플랫폼이 없는데 말이다.
