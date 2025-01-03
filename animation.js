window.addEventListener('load', function () {
    gsap.registerPlugin(ScrollTrigger);

    /* 가로 스크롤 */
    const sections = gsap.utils.toArray('.slide_bg');
    const bg = document.querySelector('.bg_image');

    let maxWidth = 0;

    const getMaxWidth = () => {
        maxWidth = 0;
        sections.forEach((section) => {
            maxWidth += section.offsetWidth;
        });
    };
    getMaxWidth();
    ScrollTrigger.addEventListener('refreshInit', getMaxWidth);

    let horizontal = gsap.to(sections, {
        x: () => `-${maxWidth - window.innerWidth}`,
        ease: 'none',
        scrollTrigger: {
            trigger: '#main-slider-container',
            pin: true,
            scrub: 0.2,
            end: () => `+=${maxWidth}`,
            invalidateOnRefresh: true,
        },
    });

    /* 텍스트 박스 */
    gsap.utils.toArray('.title').forEach(function (title) {
        gsap.timeline({
            scrollTrigger: {
                trigger: title,
                containerAnimation: horizontal,
                start: 'right right',
                end: 'left left',
                scrub: 0,
                invalidateOnRefresh: true,
            },
        }).fromTo(title, { autoAlpha: 0.3 }, { autoAlpha: 1 }, 0);
    });

    /* 배경 */
    sections.forEach((sct, i) => {
        let bgTrans = gsap.timeline({ paused: true });
        bgTrans.to(bg, 0, {
            backgroundImage: `url(/assets/img/images0${i}.jpg)`,
        });
        console.log('Index :' + i);

        ScrollTrigger.create({
            trigger: sct,
            start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth / 1) * (maxWidth / (maxWidth - window.innerWidth)),
            end: () => '+=' + sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
            toggleClass: { targets: sct, className: 'active' },
            onLeave: () => {
                // console.log('지금 ' + i);
                bgTrans.play();
            },
            onEnterBack: () => {
                // console.log('다시 ' + i);
                bgTrans.reverse();
            },
        });
    });
});
