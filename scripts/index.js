var document_onload = function() {
  /***** Compontents *****/
  /*** Main ***/
  /* plot wrapper */
  Vue.component('finger-plots', {
    props: ['plotMap', 'togglePlot'],
    template:
      `<div class="string-course">
        <plot
          v-for="plot in plotMap"
          v-bind:plot="plot"
          v-bind:key="plot.key"
          v-bind:toggle-plot="togglePlot"
        ></plot>
      </div>`
  });
  Vue.component('plot', {
    props: ['plot', 'togglePlot'],
    template:
      `<div
        :class="'plot '  + plot.display"
        v-on:click="togglePlot(plot, $event.target)">
        <span>{{plot.text}}</span>
      </div>`
  });
  /* finger-prints*/
  Vue.component('finger-prints', {
    props: {
      hasString: Boolean,
      position: String
    },
    data: function() {
      hasStringClass = (this.hasString) ? 'has-string' : '';
      return {
        hasStringClass: hasStringClass
      };
    },
    template:
      `<div :class="'string-course ' + position">
        <div :class="'string-course-block ' + hasStringClass"></div>
        <div :class="'string-course-block ' + hasStringClass"></div>
        <div :class="'string-course-block ' + hasStringClass"></div>
        <div :class="'string-course-block ' + hasStringClass"></div>
        <div :class="'string-course-block ' + hasStringClass"></div>
        <div :class="'string-course-block ' + hasStringClass"></div>
        <div :class="'string-course-block ' + hasStringClass"></div>
      </div>`
  });

  /*** ToolBar ***/
  /* color picker */
  Vue.component('color-picker', {
    props: ['value'],
    template: `
      <input type="color"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      ></input>`
  });

  /***** Models *****/
  /*** initialize ***/
  var intialNumberOfFlet = 7;
  var intialNumberOfString = 6;
  var numberOfStrings = (function(intialNumberOfString, intialNumberOfFlet) {
    return new Array(intialNumberOfString).fill(null).map(function() {
      return {
        plotMap: (function(intialNumberOfFlet) {
          return new Array(intialNumberOfFlet).fill(null).map(function() {
            return {display: 'hide', text: 'R'};
          });
        }(intialNumberOfFlet))
      };
    });
  }(intialNumberOfString, intialNumberOfFlet));
  var numberOfCourses = (function(intialNumberOfString) {
    var courses = new Array(intialNumberOfString + 1).fill(null).map(function() {
      return {hasString: true, position: ''};
    });
    courses[0].position = 'top';
    courses[courses.length - 1].position = 'bottom';
    return courses;
  }(intialNumberOfString));

  /*** Vue ***/
  var app = new Vue({
    el: "#app",
    data: {
      numberOfStrings: numberOfStrings,
      numberOfCourses: numberOfCourses,
      plotColor: '#3399ff',
      mode: 'plot'
    },
    methods: {
      togglePlot: function(plot, target) {
        debugger;
        if (plot.display === 'hide') {
          plot.display = 'show';
          target.style.background = this.plotColor;
        } else {
          plot.display = 'hide';
          target.style.background = '';
        }
      }
    }
  });
};
