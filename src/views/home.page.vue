<template>
  <section class="homepage-container">
    <div class="homepage-1">
      <h1
        class="homepage-logo"
        data-aos="slide-down"
        data-aos-mirror="true"
        data-aos-duration="500"
      >
        Trailing
      </h1>
      <h1 class="logo-quote" data-aos="slide-down" data-aos-duration="500">
        Work smart, work together.
      </h1>
      <router-link
        data-aos-duration="500"
        to="/boards"
        class="boards-link"
        data-aos="slide-up"
        data-aos-mirror="true"
        >Get started</router-link
      >
      <h1
        class="motivational"
        data-aos="fade-left"
        data-aos-mirror="true"
        data-aos-duration="500"
      >
        “Either you run the day or the day runs you.”
        <span class="motivational-author">— Jim Rohn</span>
      </h1>
    </div>
    <div class="homepage-2">
      <div class="homepage-2-img-container">
        <img src="@/assets/img/homepage-2-img.svg" />
      </div>
      <div class="homepage-2-content">
        <h1 class="homepage-2-header">
          The right way to work - Work together.
        </h1>
        <div class="txt-conatiner">
          <img
            src="@/assets/img/icons/check.png"
            alt=""
            class="homepage-check"
          />
          <p class="homepage-2-txt">Arrange your work properly.</p>
        </div>
        <div class="txt-conatiner">
          <img
            src="@/assets/img/icons/check.png"
            alt=""
            class="homepage-check"
          />
          <p class="homepage-2-txt">Improve your work productivity.</p>
        </div>
        <div class="txt-conatiner">
          <img
            src="@/assets/img/icons/check.png"
            alt=""
            class="homepage-check"
          />
          <p class="homepage-2-txt">Set your goals.</p>
        </div>
        <h1 class="motivational">
          “Great things in business are never done by one person, they’re done
          by a team of people.”
          <span class="motivational-author">– Steve Jobs</span>
        </h1>
      </div>
    </div>
    <div class="homepage-3">
      <div class="homepage-3-img-container">
        <img src="@/assets/img/homepage-3-simple.svg" />
      </div>
      <div class="homepage-3-content">
        <h1 class="homepage-3-header">Quick and easy to use.</h1>
        <div class="txt-conatiner">
          <img src="@/assets/img/icons/check.png" class="homepage-check" />
          <p class="homepage-3-txt">Create a board, task and list easily.</p>
        </div>
        <div class="txt-conatiner">
          <img src="@/assets/img/icons/check.png" class="homepage-check" />
          <p class="homepage-3-txt">Manage the team efficiently.</p>
        </div>
        <div class="txt-conatiner">
          <img src="@/assets/img/icons/check.png" class="homepage-check" />
          <p class="homepage-3-txt">Conquer your goals.</p>
        </div>
        <h1 class="motivational">
          “The individual who says it is not possible should move out of the way
          of those doing it.”
          <span class="motivational-author">—Tricia Cunningham</span>
        </h1>
      </div>
    </div>
    <div class="homepage-4">
      <div class="homepage-4-header">
        <h1>
          Join over 1,000,000 teams worldwide that are using trailing to get
          more done.
        </h1>
      </div>
      <div class="social-proof-container">
        <div class="social-container">
          <img src="@/assets/img/emp1.jpg" class="employee-img" />
          <img src="@/assets/img/icons/5-stars.png" class="stars" />
          <p class="review-txt">
            "This app has made a huge difference in our work procedures."
          </p>
        </div>
        <div class="social-container">
          <img src="@/assets/img/emp2.jpg" class="employee-img" />
          <img src="@/assets/img/icons/5-stars.png" class="stars" />
          <p class="review-txt">
            "After we started working with 'trailing' our efficiency has grown
            tremendously."
          </p>
        </div>
        <div class="social-container">
          <img src="@/assets/img/emp4.jpg" class="employee-img" />
          <img src="@/assets/img/icons/5-stars.png" class="stars" />
          <p class="review-txt">
            "I'm able to manage my employees a lot more easily with this app.
            Thank you!"
          </p>
        </div>
        <div class="social-container">
          <img src="@/assets/img/emp3.jpg" class="employee-img" />
          <img src="@/assets/img/icons/5-stars.png" class="stars" />
          <p class="review-txt">
            "Since I started using 'trailing', I finish a lot more work in a lot
            less time."
          </p>
        </div>
      </div>
    </div>
    <div class="homepage-5">
      <h1 class="homepage-5-header">What are you waiting for?</h1>
      <router-link to="/boards" class="boards-link">Get started</router-link>
    </div>
    <transition name="fade">
      <button class="icon-lg icon-top" @click="scroll" v-if="isScroll"></button>
    </transition>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isScroll: false,
    };
  },
  computed: {
    showBackTop() {
      return { btnTopShow: this.isScroll };
    },
  },
  created() {
    this.$store.commit("clearStyle");
    addEventListener("scroll", this.handleScroll, true);
  },
  destroyed() {
    window.pageYOffset = 0;
    this.isScroll = false;
  },
  mounted() {},
  methods: {
    scroll() {
      document.querySelector(".homepage-1").scrollIntoView();
      setTimeout(() => {
        window.pageYOffset = 0;
        this.isScroll = false;
      }, 300);
    },
    handleScroll() {
      window.pageYOffset++;
      if (window.pageYOffset > 30) {
        this.isScroll = true;
      }
    },
  },
};
</script>
