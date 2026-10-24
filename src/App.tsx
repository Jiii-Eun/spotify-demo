import "./App.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingSpinner from "./common/components/LoadingSpinner/LoadingSpinner";
import Layout from "./layout/Layout/Layout";
import { useExchangeToken } from "./hooks/useExchangeToken";
import { useEffect } from "react";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = lazy(() => import("./pages/SearchPage/SearchPage"));
const SearchResultPage = lazy(
  () => import("./pages/SearchResultPage/SearchResultPage"),
);
const PlaylistDetailPage = lazy(
  () => import("./pages/PlaylistDetailPage/PlaylistDetailPage"),
);

// 0. 레이아웃 - 사이드바(플레이 리스트, 메뉴)
// 1. 홈페이지 `/`
// 2. search 페이지 `/search`
// 3. search result 페이지 `/search/:query`
// 4. playlist detail 페이지 `/playlist/:id`
// 5. (모바일) 플레이 리스트 페이지, 사이드바 -> 페이지 하단

// lazy loading이란?
// 장점
// 페이지를 한번에 불러오게 되면 사이즈가 클 경우 가져오기 부담이 될 수 있다.
// 따라서 해당 페이지에 들어가는 순간에 파일을 다운받아 불러오는 방식을 lazy loading이라고 한다.
// 결과: 초기 로딩 속도가 빨라진다.
// 단점
// 초기 로딩은 빨라졌지만 페이지 이동 시 로딩하는 시간이 걸리게 된다.
// 따라서 보완하는 방법으로는 Loading 처리를 해줘야 한다.

// suspense란?
// 리액트 컴포넌트가 로딩 상태일 때 관리해주는 도구
// suspense의 자식 라우터가 비동기 상태를 관리해주는 도구

// suspense의 fallback 속성은 로딩 중에 보여줄 컴포넌트를 지정할 수 있다. (개별 페이지 지정 ok)
// 따라서 fallback 속성에 스켈레톤을 설정해주면 된다.
// 후에 Suspense를 페이지 별 Suspense로 감싸주어 페이지 별 스켈레톤으로 설정해줘야한다.

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const codeVerifier = localStorage.getItem("code_verifier");

  const { mutate: exchangeToken } = useExchangeToken();

  useEffect(() => {
    if (code && codeVerifier) {
      exchangeToken({ code, codeVerifier });
    }
  }, [code, codeVerifier, exchangeToken]);

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="search/:query" element={<SearchResultPage />} />
            <Route path="playlist/:id" element={<PlaylistDetailPage />} />
            {/* <Route path="/playlist" element={<LibraryPage />} /> */}
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
