import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

//헤더 컴포넌트
function Header(props) {
  // props로 내부 컨텐츠를 수정할 수 있다.
  console.log("props", props, props.title); //단순 props를 텍스트로 찍기 위한 콘솔로그
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(e) => {
            //a태그를 클릭 시 event를 다루는 함수 실행
            e.preventDefault(); //이벤트로 발생하는 행동을 막는다.(a태그의 href 클릭으로 인해 refresh되는 것을 막음)
            props.onChangeMode(); //앱 내 헤더 컴포넌트에서 등록한 onChangerMode prop 함수를 사용
          }}
        >
          {props.title}
        </a>
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
        <a
          id={t.id}
          href={"/read/" + t.id}
          onClick={(e) => {
            //파라미터가 1개인 경우 괄호 생략 가능
            e.preventDefault();
            props.onChangeMode(Number(e.target.id));
            //e.target은 이벤트를 유발시키는 태그를 타깃으로 삼는다. .id로 하여 a태그 안의 id={t.id}를 가져온다.
            //입력한 id는 숫자지만, a태그를 통해서 들어가는 id는 문자로 변하게 된다.
            //Number() 내장함수를 통해서 문자열로 변환한다.
          }}
        >
          {t.title}
        </a>
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

//작성기능 컴포넌트
function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.title.value;
          const body = e.target.body.value;
          props.onCreate(title, body);
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="Create" />
        </p>
      </form>
    </article>
  );
}

//수정기능 컴포넌트
function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <article>
      <h2>Update</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.title.value;
          const body = e.target.body.value;
          props.onUpdate(title, body);
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={props.title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </p>
        <p>
          <textarea
            name="body"
            placeholder="body"
            value={props.body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          ></textarea>
        </p>
        <p>
          <input type="submit" value="Update" />
        </p>
      </form>
    </article>
  );
}

// ***** 앱 *****
function App() {
  /*
  // useState의 인자는 해당 State의 초기값이다.
  //그 state의 인자값은 0번째 인덱스의 값으로 읽는다.
  //그 state를 바꿀 때는 1번째 인덱스의 함수로 사용한다.

  const _mode = useState("welcome");

  //_mode를 콘솔로 찍으면 0번 원소는 welcome, 1번 원소는 f()함수가 나타난다.
  //0번은 상태의 값을 읽을 때, 1번은 상태의 값을 변경할 때 사용한다.

  console.log("_mode", _mode);
  const mode = _mode[0]; //0번 원소에 대한 내용
  const setMode = _mode[1]; //1번 원소에 대한 내용
  */
  const [mode, setMode] = useState("WELCOME"); //위의 3줄을 축약함
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);

  // topics 상수를 배열 형태로 생성하여
  // 네비 컴포넌트에서 출력할 데이터를 형성해준다.
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "javascript is ..." },
  ]);
  let content = null;
  let contextControl = null;
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, Web"></Article>;
  } else if (mode === "READ") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>;
    contextControl = (
      <li>
        <a
          href={"/update/" + id}
          onClick={(e) => {
            e.preventDefault();
            setMode("UPDATE");
          }}
        >
          Update
        </a>
      </li>
    );
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(_title, _body) => {
          const newTopic = { id: nextId, title: _title, body: _body };
          //상태 만들 때 상태 데이터가 원시적인 primitive(string, number, boolean)이 아닌
          //범 객체 데이터 object(object, array)라면
          //데이터를 복제하고, 복제한 새로운 데이터를 변경하여 set~~함수로 값을 변경해줘야 한다.
          //배열로 만들어진 상태 데이터(객체)는 데이터를 변경 시에 원본 데이터와 일치한지, 다른지를 비교한다.
          //객체 데이터는 새로 들어온 데이터가 같은 데이터라면 굳이 컴포넌트를 다시 렌더링하지 않는다.
          const newTopics = [...topics]; //topics 데이터를 newTopics로 복제
          newTopics.push(newTopic); //복제본에 push하여 복제본을 바꾼다
          setTopics(newTopics);
          setMode("READ"); //글의 상세 페이지로 이동
          setId(nextId);
          setNextId(nextId + 1); //다음에 글을 추가할 것을 대비하여
        }}
      ></Create>
    );
  } else if (mode === "UPDATE") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = (
      <Update
        title={title}
        body={body}
        onUpdate={(title, body) => {
          console.log(title, body);
        }}
      ></Update>
    );
  }

  return (
    <div>
      <Header
        title="WEB"
        onChangeMode={() => {
          //onChangeMode prop을 alert 띄우는 함수로 설정
          setMode("WELCOME");
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          setMode("READ");
          setId(_id);
        }}
      ></Nav>
      {content}
      <ul>
        <li>
          <a
            href="/create"
            onClick={(e) => {
              e.preventDefault();
              setMode("CREATE");
            }}
          >
            Create
          </a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
