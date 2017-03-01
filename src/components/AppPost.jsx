// external
import React from "react";
import axios from 'axios';
import {Pagination} from 'react-bootstrap';
// internal
import api from 'config/api';

/**
 *  Child Class  for App Parent Class
 *
 */
class Appchild extends React.Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
        /**
         * @type {object}
         * @property {string} child app class
         */
        this.state = {
            msg: [],
            editing: false
        };
    }

    /**
     * status setting for edit and save
     */
    edit () {
        this.setState({editing:true});
    }

    /**
     * update  app data
     *
     */
    save() {
        var val=this.refs.newText.value;
        var val1=this.refs.newText1.value;
        console.log("comment : " + val);
        console.log("comment1 : " + val1);
        this.setState({editing:false});
        const self = this;
        var data = {
            name: val,
            contactEmail: val1
        };
        //this.props.updateCommentText(this.props.id,val,val1,this.props.index)
        axios.put(api.app+ '/' +this.props.id, data)
            .then(function (response) {
                self.props.updateCommentText(self.props.id,val,val1,self.props.index)
            })
            .catch(function(response) {
                if(response instanceof Error) {
                    console.log(response.message);
                } else {
                    console.log(response.data);
                }
            });
    }

    /**
     * Remove from apps array
     *
     */
    remove() {
        console.log("Removeddd : "+this.props.id);
        if (confirm("Are you sure you want to remove?")) {
            // your deletion code
            const self = this;
            axios.delete(api.app+ '/' +this.props.id)
                .then(function (response) {
                    self.props.deleteComentBoard(self.props.index)
             })
             .catch(function(response) {
                 if(response instanceof Error) {
                    console.log(response.message);
                 } else {
                    console.log(response.data);
                 }
             });
        }
        return false;
    }

    /**
     * Html render for normal render
     * render
     *  @return {ReactElement} markup
     */
    renderNormal() {
        return(
            <div className="commentContainer">
                <div className="commentText">{this.props.children}</div>
                <button onClick={this.edit.bind(this)} className="button-primary">Edit</button>
                <button onClick={this.remove.bind(this)} type="button">Remove</button>
            </div>
        );

    }

    /**
     *After click edit button new HTML form for Edit
     *render
     *  @return {ReactElement} markup
     */
    renderForm() {
        return(
            <div className="commentContainer">
              Name :  <input type="text" ref="newText"  defaultValue={this.props.name1}/>
             Email : <input type="text" ref="newText1"  defaultValue={this.props.email1}/>
                <button onClick={this.save.bind(this)} className="button-primary">Save</button>
            </div>
        );

    }

    /**
     * maintaining normalform and after click edit using editing flag
     * render
     *  @return {ReactElement} markup
     */
    render() {
        if(this.state.editing) {
            return this.renderForm();
        }else {
            return this.renderNormal();
        }
    }

}

/**
 *
 * Error and Message Class
 *
 */
class Message extends  React.Component {

    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
        /**
         * @type {object}
         * @property {string} AppPost  Apps
         */
        this.state = {
            msg: [],
            type: false
        };
    }

    /**
     * Html render for Error render
     * render
     *  @return {ReactElement} markup
     */
    renderError() {
        return (
            <ul>
                {this.props.msg.map(function(value) {
                    return <li>{value}
                    </li>
                })}
            </ul>
        )
    }

    /**
     * Html render for Success render
     *render
     *  @return {ReactElement} markup
     */
    renderSuccess() {
        return(
            <div>
                {this.props.msg}
            </div>
        );
    }

    /**
     * render
     * @returns {ReactElement}
     */
    render() {
        if(this.props.type) {
            return this.renderError();
        }else {
            return this.renderSuccess();
        }
    }
}

/**
 *App parent Class
 */
class AppPost extends React.Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
        /**
         * @type {object}
         * @property {string} AppPost  Apps
         */
        this.state = {
            apps          :[],
            name          : '',
            description  : '',
            scope         :'',
            contactName  :'',
            contactEmail :'',
            msg: [],
            type: false,
            page:1
        };
    }

    /**
     * call initial method to display app list
     */
    loadAppsFromServer() {
        const self = this;
        axios.get(api.app)
            .then(function (res) {
                self.setState({
                    apps: res.data
                })
            })
            .catch(function(res) {
                if(res instanceof Error) {
                    console.log(res.message);
                } else {
                    console.log(res.data);
                }
            });
    }

    /**
     * Add New App
     *
     */
    add(event) {
        event.preventDefault();
        var data = {
            name: this.state.name,
            description:this.state.description,
            scope: {name:this.state.scope},
            contactName: this.state.contactName,
            contactEmail: this.state.contactEmail
        };

        const self = this;
        axios.post( api.app, data)
            .then(function (response) {
             var arr = self.state.apps;
                arr.push(response.data);
                self.setState({apps:arr});
                self.setState({msg:[self.state.name + ' added ']});
                self.setState({type:false});
            })
            .catch(function (error) {
                var errArr = [];
                errArr.push(error.response.data.message);
                error.response.data.details.forEach(function(item){
                    errArr.push(item.message);
                });
                self.setState({type:true});
                self.setState({msg:errArr});
               // self.setState({msg:error.response.data});
            });
    }

    /**
     * Remove App
     * @param i
     */
    removeComment(i) {
        var arr = this.state.apps;
        arr.splice(i,1);
        this.setState({apps:arr});
    }

    /**
     * Update apps Array
     * @param id
     * @param newText
     * @param newText1
     * @param i
     */
    updateComment(id,newText,newText1,i) {
        console.log('update:' +newText);
        var arr = this.state.apps;
        arr[i]= {"id":id,"name":newText,"contactEmail":newText1};
        this.setState({apps:arr});
    }

    /**
     *Initial call
     *
     */
    componentDidMount() {
      this.loadAppsFromServer();
   }

    /**
     * state change of every input field
     * handle change event at input form
     * @param {SytheticEvent} e
     */
    onInputChange(e) {
       // this.state.apps[e.target.name] = e.target.value;
        this.setState({[e.target.name]: e.target.value});
    }

    changePage(page) {
        console.log(page);
       this.setState({page: page});
    }
    /**
     * Html render
     * @return {ReactElement} markup
     */
    render() {
        const per_page=2;
        const pages=Math.ceil(this.state.apps.length/per_page);
        const current_page =this.state.page;
        const start_offset = (current_page-1)*per_page;
        let start_count=0;
        return (
            <div>
                <Message msg={this.state.msg} type={this.state.type}></Message>
                <button onClick={this.add.bind(this)}>ADD</button>
                <div>
                    <label >  Name: </label> <input type="text" ref="name" name="name"  onChange={this.onInputChange.bind(this)}/>
                    <label >  Description: </label> <input type="text" name="description" ref="description" onChange={this.onInputChange.bind(this)}/>
                    <label >  Scope: </label> <input type="text"  ref="scope" name="scope" onChange={this.onInputChange.bind(this)}/>
                    <label >  Contact Name: </label> <input type="text" name="contactName"  ref="contactName" onChange={this.onInputChange.bind(this)}/>
                    <label >  Email: </label> <input type="text"  ref="contactEmail" name="contactEmail" onChange={this.onInputChange.bind(this)}/>
                </div>
                <p></p>
                <div className="AppPost">
                    {this.state.apps.map((text, i) => {
                        if(i>=start_offset && start_count<per_page){
                            start_count++;
                            return(
                                <Appchild name1={text.name} email1={text.contactEmail}  key={i} index={i} id={text.id}  updateCommentText={this.updateComment.bind(this)} deleteComentBoard={this.removeComment.bind(this)}>
                                    <div>{text.name}</div><div>{text.contactEmail}</div>
                                    <p></p>
                                </Appchild>
                            )
                        }

                    })
                    }
                </div>
                <div>
                    <Pagination  className="user-pagination pull-rught"  bsSize="medium" maxButtons={10} first last next prev boundryLinks items={pages}  activePage={current_page}
                        onSelect={this.changePage.bind(this)}
                    />
                </div>
            </div>
        )
    }
}
export default AppPost;