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
      document.querySelector('#'+e + ' > div').classList.remove('resting');
      //self.opts.state = '';
      //self.update();
    });
  </script>
</styleguide-module>
