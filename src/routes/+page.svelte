
<div class="HomeGrid">
    <span class="Irow">
    <div class="Item">
        <div class="IName">
            Mug

        </div>
        <div class="IMage">
            Image du mug

        </div>
        <button type="button">/*lien a page de customisation*/ </button>

    </div>
   <div class="Item">
        
    </div>
   <div class="Item">
        
    </div>
    </span>

  <span class="Irow">
    <div class="Item">
        <div class="IName">
            Mug

        </div>
        <div class="IMage">
            Image du mug

        </div>
        <button type="button">/*lien a page de customisation*/ </button>

    </div>
   <div class="Item">
        
    </div>
   <div class="Item">
        
    </div>
    </span>

</div>




<style>
    .HomeGrid{
        background-color: aqua;
        position: absolute;
        align-items: center;
        align-self: center;

        padding: 10px;
      
    }
    .Irow{
        align-items: left;
        position: relative;
    }
    .Item{
        width: 20vw;
        height: 20vw;
        background-color: aquamarine;
        margin: 20px;
        position: inline;
    }
    .IName{
        font-size: large;
        align-self:center;
        text-align: center
        ;
    }
    .IMage{
        max-width: 80%;
        max-height: 80%;
    }
    button{
        border-radius: 10px;
        border-width: 1px;
    }
	p {
		/* this will only affect <p> elements in this component */
		color: burlywood;
	}
</style>