gsap.from(".player-card", {
    duration: .02,
    scale: 0.0,
    y: 40,
    ease: "power1.inOut",
    stagger: {
      // grid: [5,23],
      from: "start",
      amount: 1.5
    }
  });
