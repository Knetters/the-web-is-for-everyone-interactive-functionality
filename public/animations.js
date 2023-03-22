gsap.from(".player-card", {
    duration: .02,
    scale: 0.0,
    y: 40,
    ease: "power1.inOut",
    stagger: {
    from: "start",
    amount: .5
  }
});

gsap.from("tr", {
  duration: .02,
  scale: 0.0,
  y: 40,
  ease: "power1.inOut",
  stagger: {
  from: "start",
  amount: .5
}
});