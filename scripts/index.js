var document_onload = function() {
  /***** Compontents *****/
  /*** Main ***/
  /* plot wrapper */
  Vue.component('finger-plots', {
    props: ['plotMap', 'onClickPlot'],
    template:
      `<div class="string-course">
        <plot
          v-for="plot in plotMap"
          v-bind:plot="plot"
          v-bind:key="plot.key"
          v-bind:on-click-plot="onClickPlot"
        ></plot>
      </div>`
  });
  Vue.component('plot', {
    props: ['plot', 'onClickPlot'],
    template:
      `<div
        :class="'plot '  + plot.display"
        v-on:click="onClickPlot(plot, $event.target)">
        <span v-if="plot.edit === false" v-text="plot.text"></span>
        <input
          v-if="plot.edit === true"
          v-model="plot.text"
          v-on:blur="plot.edit = false"
          v-auto-focus>
        </input>
      </div>`
  });
  /* finger-prints*/
  Vue.component('finger-prints', {
    props: {
      hasString: Boolean,
      position: String,
      flets: Array
    },
    data: function() {
      hasStringClass = (this.hasString) ? 'has-string' : '';
      return {
        hasStringClass: hasStringClass
      };
    },
    template:
      `<div :class="'string-course ' + position">
        <string-course-block
          v-for="flet in flets"
          v-bind:key="flet.key"
        ></string-course-block>
      </div>`
  });
  Vue.component('string-course-block', {
    props: [],
    template: `<div class="string-course-block has-string"></div>`
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
  /* select mode */
  Vue.component('select-mode', {
    props: ['value'],
    template: `
      <select
        v-bind:value='value'
        v-on:input="$emit('input', $event.target.value)">
        <option>plot</option>
        <option>editText</option>
      </select>`
  });
  /*  */
  Vue.component('select-number-of-flets', {
    props: ['onChangeNumberOfFlets'],
    template: `
      <input
        type="number"
        value="6"
        v-on:input="onChangeNumberOfFlets">
      </input>`
  });

  /***** Directives *****/
  Vue.directive('auto-focus', {
    inserted: function (el) {
      el.focus();
    }
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
            return {display: 'hide', text: '', edit: false};
          });
        }(intialNumberOfFlet))
      };
    });
  }(intialNumberOfString, intialNumberOfFlet));

  var numberOfCourses = (function(intialNumberOfString) {
    var courses = new Array(intialNumberOfString - 1).fill(null).map(function() {
      return {hasString: true, position: ''};
    });
    courses[0].position = 'top';
    return courses;
  }(intialNumberOfString));

  var flets = (function(intialNumberOfFlet) {
    return new Array(intialNumberOfFlet).fill(null).map(function(arr, index) {
      return {fletNumber: index};
    });
  }(intialNumberOfFlet));

  /*** Vue ***/
  var app = new Vue({
    el: "#app",
    data: {
      numberOfStrings: numberOfStrings,
      numberOfCourses: numberOfCourses,
      flets: flets,
      plotColor: '#3399ff',
      mode: 'plot'
    },
    methods: {
      onClickPlot: function(plot, target) {
        if (this.mode === 'plot') {
          this.togglePlot(plot, target);
        } else if (this.mode === 'editText' && plot.display === 'show') {
          this.editText(plot, target);
        } else {
          return;
        }
      },
      togglePlot: function(plot, target) {
        if (plot.display === 'hide') {
          plot.display = 'show';
          target.style.background = this.plotColor;
        } else {
          plot.display = 'hide';
          target.style.background = '';
          plot.text = '';
        }
      },
      editText: function(plot, target) {
        plot.edit = true;
      },
      onChangeNumberOfFlets: function(event) {
        var input = parseInt(event.target.value);
        if (input >= 1) {
          this.setFlets(input);
          this.setPlotMap(input)
        }
      },
      setFlets: function(numberOfFlet) {
        this.flets = new Array(numberOfFlet).fill(null).map(function(arr, index) {
          return {fletNumber: index};
        });
      },
      setPlotMap: function(numberOfFlet) {
        this.numberOfStrings = this.numberOfStrings.map(function(numberOfString) {
          var newPlotMap = new Array(numberOfFlet).fill(null).map(function(arr, index) {
            if (numberOfString.plotMap[index]) {
              return numberOfString.plotMap[index];
            } else {
              return {display: 'hide', text: '', edit: false};
            }
          });
          numberOfString.plotMap = newPlotMap;
          return numberOfString;
        });
        debugger;
      }
    }
  });
};
