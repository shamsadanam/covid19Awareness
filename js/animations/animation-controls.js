(function () {
  //this variable is recomended by postman API
  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  async function getData() {
    const date = new Date().toISOString().slice(0, 10);

    const response = await fetch(
      `https://covid19-api.org/api/status?date=${date}`,
      requestOptions
    );
    const responseText = await response.text();
    const counts = JSON.parse(responseText);
    let totalCases = 0;
    let totalDeaths = 0;

    counts.forEach((item) => {
      totalCases += item.cases;
      totalDeaths += item.deaths;
    });

    return {
      totalCases,
      totalDeaths,
    };
  }

  (async function () {
    const data = await getData().catch((err) =>
      console.log("This error occured " + err)
    );

    let counter = {
      val: data.totalCases - 100,
      val2: data.totalDeaths - 100,
    };
    gsap.to(counter, 4, {
      val: data.totalCases,
      val2: data.totalDeaths,
      snap: "val,val2",
      onUpdate: function () {
        document.querySelector(
          "#caseCount"
        ).innerHTML = counter.val.toLocaleString("en-IN");
        document.querySelector(
          "#deathCount"
        ).innerHTML = counter.val2.toLocaleString("en-IN");
      },
    });
    console.log(data.totalCases);
    console.log(data.totalDeaths);
  })();

  // let tl = gsap.timeline();

  // tl.from("#headingTop p", {
  //   duration: 1,
  //   x: 200,
  //   opacity: 0,
  //   ease: "power4",
  // });

  // tl.from(".lif-card", {
  //   duration: 1,
  //   // rotationX: -90,
  //   scale: 0.1,
  //   opacity: 0,
  //   // x: 100,
  //   // y: -50,
  //   ease: "power4",
  //   // boxShadow: "5px 50px 50px rgba(0, 0, 0, .1)",
  //   stagger: 1,
  // });
  // tl.from("#headingBottom p", {
  //   duration: 1,
  //   x: -50,
  //   opacity: 0,
  //   ease: "power4",
  // });
})();
