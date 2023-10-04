export default function loding() {
  window.onload = function () {
    document.body.classList.add("loaded_hiding");
    window.setTimeout(function () {
      document.body.classList.add("loaded");
      document.body.classList.remove("loaded_hiding");
    }, 1500);
  };
}
loding();

// useEffect(() => {
// 	//  Обработка начала загрузки
// 	router.events.on("routeChangeStart", () => {
// 		setLoading(true);
// 	});
// 	//  Обработка окончания загрузки
// 	router.events.on("routeChangeComplete", () => {
// 		setLoading(false);
// 	});
// }, [router.asPath, router.events]);
