# javascript-vm
레벨3


### 01 html 설계 하기 

자판기 
* 상품들 
* 버튼들 
* 디스플레이 창 입력된 금액
* 로그 창 행동들 기록 

지갑 
* 버튼들
* 디스플레이 창 갖고 있는 금액

## 02 css 자판기 상품들만 layout Design

### CSS Text vertical 가운데 정렬 !!!

```css

//부모
position: relative;
//자식
transform: translate(-50%,-50%);
position: absolute;
top: 50%;
left: 50%;

or 하위 지원도 가능함 ! 

//부모
display: table
//자식
display: table-cell;
vertical-align: middle;


```

### MVC 패턴 설계 하기 



1. Model 

VendingMachineModel
WalletModel
View


vendingMachineView 

1. 초기 렌더링 
[O] Dom이 load될 때  snackList, buttonList, .. 정적 template 을 렌더한다 
 -> + myMoney를 바탕으로 -> totalMoney까지 렌더링한다.

2.
[O] 돈 입력 버튼이 클릭 되었을 때 해당 돈이 있으면  토탈 금액이 클릭된 금액 만큼 감소하고 + 해당 금액 갯수가 감소된다. 
질문  
1. 이 처리를 뷰에서만 하고 data로 넘겨줘서 처리 하는지 ->  view->event->viewupdate->controller->model
2. 이벤트를 넘겨주고 data가 업데이트 된다음 뷰를 업데이트 시켜주는지 ?.?
view -event-> controller->model->controller -> view

처음에 1번 방향으로 진행하려 했는데 데이터를 뷰에서 처리해줘야 되는 부분이 어색하다... 
2번으로 다시 선회 


자판기에 돈을 투입하면, 앞서 개발한 부분(지갑의 잔금과 투입금액)이외에 추가로 처리해야할 부분이 있다. 투입이후에는 그 처리결과를 화면에 표시해야하고(log를 쌓는다고 표현한다) 구입가능한 음료를 하이라이트 해야 한다.

체크리스트 작성
[ ] 돈 이 입력되면 로그 창에 돈이 입력되었다고 나온다.
- 돈이 입력되면 돈이 입력되었다는 로그를 누적한다 VendingMachineModel에