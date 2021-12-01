import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Upload from '../images/upload.svg'
import './FileUpload.css'
import axios, { post } from 'axios';
import swal from 'sweetalert';
import $ from 'jquery'
import All from '../website/All.module.css'
import { Link } from 'react-router-dom';

class FileUpload extends React.Component {
	constructor(props) {
		super(props); 
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this); 
		this.state = {
			fileName: '',
			productdatail: ''
		};
	}

	handleSubmit(evt) {
		evt.preventDefault(); 
	}

	handleInputChange(evt) {  
		this.setState({ productdatail: evt.target.value })
		var file = document.querySelector("#fUpload");
		if (/\.(jpe?g|JPG|png|mp4|flv|mkv|MOV|WMV|AVI|FLV|F4V|SWF|jfif)$/i.test(file.files[0].name) === false) {
			swal("We don't support that file type");
		} else { 
			this.setState({
				fileName: this.fileInput.value
					? this.fileInput.files[0].name
					: ''
			});

			var f = evt.target.files;
			for (var i = 0; i < f.length; i++) {
				(function (n) {
					var reader = new FileReader();
					reader.readAsBinaryString(f[n]);

					reader.onloadstart = function (e) {
						var text = "<div><div class=loading><div class=percent-"
							+ n + ">0%</div></div></div>";
						$("#file-list").append(text + "<br>");
					}

					reader.onload = function (e) {
						var progress = $(".percent-" + n);
						progress.css("width", "100%"); // replacing with percentage
						progress.text("100%");
						// status.html(xhr.responseText);
					}
				}(i))
			}
		}
	}


	render() {

		return (
			<>
				<form className="forms" onSubmit={this.handleSubmit}>
					<div className="uploadFile">
						<input type="file"
							name="fileInput"
							id="fUpload"
							onChange={this.handleInputChange} 
							ref={input => this.fileInput = input}
							className="form-control" />
						<img src={Upload} />
						<p className={All.FSize_16}><span style={{ color: '#67edfa' }} className={All.FSize_16}>browser </span>to choose a File, if you want upload more than limited size<span><Link to='/UpgradeProVersion' style={{ color: '#67edfa', textDecorationLine: 'none' }} className={All.FSize_16}> Go Pro</Link></span></p>

						{
							this.state.fileName
							&& <> 
								<div id="file-list"></div> 
								<h6 className={All.Bold}>
									Uploading Successful: <span >{this.state.fileName}</span>
								</h6>
							</>
						}

					</div>
				</form>
			</>
		);
	}
}

export default FileUpload








