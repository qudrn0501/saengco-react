import logo from "./logo.svg";
import "./App.css";

//헤더 컴포넌트
function Header(props) {
  // props로 내부 컨텐츠를 수정할 수 있다.
  console.log("props", props, props.title); //단순 props를 텍스트로 찍기 위한 콘솔로그
  return (
    <header>
      <h1>
        <a href="/">{props.title}</a>
      </h1>
    </header>
  );
} // App 내 헤더 컴포넌트에 적은 title 값을 {props.title} 형태로 이용, title값만 변경하면 된다.

//네비 컴포넌트
function Nav(props) {
  //앱 컴포넌트에서 만든 topics 배열을 받는다
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a href={"/read/" + t.id}>{t.title}</a>
      </li>
    );
  } //lis 배열을 열어 topics를 받을 준비를 한다.
  // for문을 돌려 반복 형태를 만드는데, topics 내 객체의 갯수 만큼 반복을 돌린다.

  // t는 topics 내 i번째 props를 연결해 주었음을 뜻하며
  // lis.push()는 lis에 ()안의 내용을 집어넣는다.
  // 즉, lis 안에는 li로 이루어진 반복된 html이 들어가며,
  // const lis = [
  //   <li key="1"><a href="/read/1">html</a></li>,
  //   <li key="2"><a href="/read/2">css</a></li>,
  //   <li key="3"><a href="/read/3">js</a></li>,
  // ] 의 형태로 들어가게 된다.

  // 리스트의 각 child는 고유의 key prop이 필요하다, 여기서는 li마다 key가 필요하여 key={t.id}로 하여금
  // topics의 id를 활용하여 각 li마다 고유한 키 값을 가지게 하여 구별할 수 있게 한다.
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}
// nav 안의 ol에 lis 상수 형태의 li들을 topics 값을 적용하여 출력한다.

//아티클 컴포넌트
function Article(props) {
  // props는 props.~~로 여러개의 값을 적용할 수 있다.
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function App() {
  // topics 상수를 배열 형태로 생성하여
  // 네비 컴포넌트에서 출력할 데이터를 형성해준다.
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "javascript is ..." },
  ];
  return (
    <div>
      <Header title="WEB"></Header>
      <Nav topics={topics}></Nav>
      <Article title="Welcome" body="Hello, Web"></Article>
    </div>
  );
}

export default App;
