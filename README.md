# Assignment: Game Item Simulation

## 기능
1. 캐릭터 생성 & 조회 & 삭제
2. 아이템 생성 & 조회 & 업데이트

## 개발환경
- Express.js 기반으로 CRUD 사용
- MongoDB & Mongoose
- AWS EC2 배포

## API 명세서

### 1. Characters
   
| 기능  | API URL | METHOD | REQUEST | RESPONSE  |
| ----- | ------- | ------ | ------- | -------- |
| 캐릭터 생성  | /api/characters  | POST | {"name": "silver"}  | {"name": "silver", "character_id": 1}  |
| 캐릭터 상세 조회  | /api/characters/:character_id  | GET  | - | {"name": "silver", "health": 100, "power": 50} |
| 캐릭터 삭제  | /api/characters/:id | DELETE  | - | { "message": "Character successfully deleted!" }  |

### 2. Items

| 기능  | API URL | METHOD | REQUEST | RESPONSE  |
| ----- | ------- | ------ | ------- | -------- |
| 아이템 생성  | /api/items | POST | {"item_code": 4, "item_name": "Bloody Dagger", "item_stat": [{"health": 15, "power": 25}]}  | {"item_code": 4, "item_name": "Bloody Dagger", "item_stat": [{"health": 15, "power": 25}]}  |
| 아이템 수정  | /api/items/:item_code  | PATCH | {"item_name": "Bloody Dagger 2", "item_stat": [{"power": 35}]}  | {"message": "Item updated successfully"}{"item_name": "Bloody Dagger 2", "item_stat": [{"power": 35}]} |
| 아이템 목록 조회  | /api/items  | GET  | -  | {["item_code": 1, "item_name": "vortex scythe"}, {"item_code": 2, "item_name": "Silencer Bullet"}, ...]}|
| 아이템 상세 조회  | /api/items/:item_code  | GET  | - | {"item_code": 4, "item_name": "Bloody Dagger2", "item_stat": [{"power": 35}]}  |
