<styleguide-module>
  <div class="{ opts.state }" onclick="{ toggleState }">
    <yield/>
  </div>
  <script>
    var self = this;
    this.on('mount', function(){
      console.log('all done');
    });

    this.opts.observable.on('showComponent', function(e) {
        var sections = document.querySelectorAll('styleguide-module > div'), i;

        for (i = 0; i < sections.length; ++i) {
          sections[i].classList.add('resting');
        }
      console.log(e);
      document.querySelector('#'+e + ' > div').classList.remove('resting');
      //self.opts.state = '';
      //self.update();
    });
  </script>
</styleguide-module>
