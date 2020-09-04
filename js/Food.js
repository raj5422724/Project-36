class Food {
    constructor() {
        this.foodStock;
        var lastFed;
        this.image = loadImage("images/milk.png");
    }
    getFoodStock(){
        return this.foodStock;
    }
    updateFoodStock(foodStock){
        this.foodStock=foodStock;
    }
      
    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
        }
    }
    display(){
        var x=80,y=100;
        
        imageMode(CENTER);

        if(this.foodStock !== 0){
          for(var i=0;i<this.foodStock;i++){
            if(i%10==0){
              x=80;
              y=y+50;
            }
            image(this.image,x,y,50,50);
            x=x+30;
          }
        }
      }
    bedroom() {
        background(bedroom,550,500);  
    }
      
    garden() {
        background(garden,550,500);  
    } 
  
    washroom() {
        background(washroom,550,500); 
    }
}