import React, {useEffect} from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

function ListTopics() {

    let ListStyle = styled.div`
    .list-topics-content {
    position: relative;
    top: -98px;
    z-index: 1;
}
.list-topics-content ul li { display: inline-block;}

.centered-list {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
    align-items: center;
    width: 100%; /* 반응형을 위해 너비를 100%로 설정 */
}

.single-list-topics-content{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 205px;
    height: 170px;
    background:#fff;
    border-radius: 3px;
    margin-right: 20px;
    margin-bottom: 20px;
    box-shadow: 0 0px 10px rgba(71,71,71,.2);
    -webkit-transition: .3s linear; 
    -moz-transition:.3s linear; 
    -ms-transition:.3s linear; 
    -o-transition:.3s linear;
    transition: .3s linear;
}
.single-list-topics-content h2>a { margin: 13px 0;}
/*.single-list-topics-content:last-child{margin-right: 0;}*/

.single-list-topics-content:hover h2>a,.single-list-topics-content:hover p{color: #fff!important;}
.single-list-topics-content:hover{
    color: #fff;
    background:#FA8072;
    box-shadow: 0 5px 10px rgba(71,71,71,.4);
}
`

    

    return (
        <ListStyle>
        <section id="list-topics" className="list-topics">
            <Container>
                <div className="list-topics-content">
                    <ul className='centered-list'>
                        <ListItem
                            
                        />
                        <ListItem
                            
                        />
                        <ListItem
                            
                        />
                        <ListItem
                            
                        />
                        <ListItem
                            
                        />
                    </ul>
                </div>
            </Container>
        </section>
        </ListStyle>
    );
}

function ListItem({ iconClass, title, listings }) {
    return (
        <li>
            <div className="single-list-topics-content">
                <div>
                    <i className={iconClass}></i>
                </div>
                <h2><a href="#">{title}</a></h2>
                <p>{listings}</p>
            </div>
        </li>
    );
}



export default ListTopics;