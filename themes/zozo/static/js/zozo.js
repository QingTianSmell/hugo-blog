"use strict";

function refactorToc(toc) {
  // when headings do not start with `h1`
  const oldTocList = toc.children[0];
  let newTocList = oldTocList;
  let temp;
  while (
    newTocList.children.length === 1 &&
    (temp = newTocList.children[0].children[0]).tagName === "UL"
  ) {
    newTocList = temp;
  }

  if (newTocList !== oldTocList) toc.replaceChild(newTocList, oldTocList);
}

function linkToc() {
  const links = document.querySelectorAll("#TableOfContents a:first-child");
  for (let i = 0; i < links.length; i++) links[i].className += " toc-link";

  for (let num = 1; num <= 6; num++) {
    const headers = document.querySelectorAll(".post_content>h" + num);
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      header.innerHTML = `<a href="#${header.id}" class="headerlink anchor"><i class="iconfont icon-link"></i></a>${header.innerHTML}`;
    }
  }
}

function initToc() {
  const HEADERFIX = 30;
  const $toclink = $(".toc-link");
  const $headerlink = $(".headerlink");
  const $tocLinkLis = $(".post-toc-content li");

  const headerlinkTop = $.map($headerlink, function(link) {
    return $(link).offset().top;
  });

  const headerLinksOffsetForSearch = $.map(headerlinkTop, function(offset) {
    return offset - HEADERFIX;
  });

  const searchActiveTocIndex = function(array, target) {
    for (let i = 0; i < array.length - 1; i++) {
      if (target > array[i] && target <= array[i + 1]) return i;
    }
    if (target > array[array.length - 1]) return array.length - 1;
    return -1;
  };

  $(window).scroll(function() {
    const scrollTop = $(window).scrollTop();
    const activeTocIndex = searchActiveTocIndex(
      headerLinksOffsetForSearch,
      scrollTop
    );

    $($toclink).removeClass("active");
    $($tocLinkLis).removeClass("has-active");

    if (activeTocIndex !== -1) {
      $($toclink[activeTocIndex]).addClass("active");
      let ancestor = $toclink[activeTocIndex].parentNode;
      while (ancestor.tagName !== "NAV") {
        $(ancestor).addClass("has-active");
        ancestor = ancestor.parentNode.parentNode;
      }
    }
  });
}

function toc() {
  const tocContainer = document.getElementById("post-toc");
  if (tocContainer !== null) {
    const toc = document.getElementById("TableOfContents");
    if (toc === null) {
      // toc = true, but there are no headings
      tocContainer.parentNode.removeChild(tocContainer);
    } else {
      refactorToc(toc);
      linkToc();
      initToc();
    }
  }
}

// back-to-top
$(document).ready(
  (function(_this) {
    return function() {
      let bt;
      bt = $("#back_to_top");
      if ($(document).width() > 480) {
        $(window).scroll(function() {
          let st;
          st = $(window).scrollTop();
          if (st > 30) {
            return bt.css("display", "block");
          } else {
            return bt.css("display", "none");
          }
        });
        return bt.click(function() {
          $("body,html").animate(
            {
              scrollTop: 0
            },
            800
          );
          return false;
        });
      }
    };
  })(this)
);

// nav-toggle
$(document).ready(
  (function(_this) {
    return function() {
      let nav, icon;
      icon = $("#menu_icon");
      nav = $("#site_nav");
      icon.click(function() {
        nav.slideToggle(250);
      });
    };
  })(this)
);

// toc
$(document).ready(
  (function(_this) {
    return function() {
      toc();
    };
  })(this)
);
