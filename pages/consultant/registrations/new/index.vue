<template>
 	<div class="modal-container">
        <a href="#" class="modal-close"><font-awesome-icon :icon="['fa', 'times']" /></a>
		<div class="f-forms"> 
			<h1>Consultant New Registration</h1>
			<!-- <form action="#" method="post" class="form" @submit.prevent="fakeSubmit"> -->
			<form
				v-if="apiData"
				action="#"
				method="post"
				class="form"
				@submit.prevent="saveValue"
			>
				<fieldset>
					<div class="row">
						<div class="col s12 m6">
							<legend>Candidate Details</legend>
						</div>
					</div>
					<div class="row">
						<div class="f-forms__element col s12 m6">
							<!-- First name --> 
								<input
									id="fname"
									v-model="firstName"
									name="fname"
									type="text" 
									placeholder="First Name"
									required
								/>
								<label for="fname" class="active">First Name:</label>       
						</div>  
						<div class="col s12 m6">
							<!-- Last name -->
							<div class="f-forms__element">
								<input
									id="lname"
									v-model="lastName"
									name="lname"
									type="text"
									placeholder="Surname"
									required
								/>
								<label for="lname">Last Name:</label>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col s12 m6">
							<!-- Email -->
							<div class="f-forms__element">
								<input
									id="email"
									v-model="email"
									name="email"
									type="email"
									required
									placeholder="Email"
								/>
								<label for="email">Email:</label>
							</div>
						</div>
						<div class="col s12 m6">
							<!-- Phone number -->
							<div class="f-forms__element">
								<input
									id="phone"
									v-model="phone"
									name="phone"
									type="tel"
									placeholder="Mobile Number"
									required
								/>
								<label for="phone">Mobile number:</label>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col s12 m6">
							<!-- Date of Birth -->
							<div class="f-forms__element">
								<input
									id="dob"
									v-model="dob"
									name="dob"
									type="date"
									placeholder="Date of birth"
									required
								/>
								<label for="dob">Date of birth:</label>
							</div>
						</div>
					</div>
				</fieldset>
				<fieldset>
					<div class="row">
						<div class="col s12">  
							<legend>Type of application</legend>
						</div>
					</div>
					<div class="row">
						<div class="col s12">  
							<!-- Branch -->
							<div class="f-forms__select input-field">
								<select
									id="branch"
									v-model="selectedBranchId"
									name="branch"
									required
								>
									<option value="">Please select:</option>
									<option
										v-for="(branch, index) in apiData.branches"
										:key="`branch-${index}`"
										:value="branch.id"
									>
										{{ branch.name }}
									</option>
								</select>
								<span class="select-arrow">
									<font-awesome-icon :icon="['fa', 'caret-down']" />
								</span>
								<label for="branch">Branch:</label>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col s12">
							<!-- Registration flow --> 
							<div class="f-forms__select">
								<select
									id="flow"
									v-model="selectedRegistrationId"
									name="flow"
									required
								>
									<option value="">Please select:</option>
									<option
										v-for="(flow, index) in activeFlows"
										:key="`flow-${index}`"
										:value="flow.id"
									>
										{{ flow.title }}
									</option>
								</select>
									<span class="select-arrow">
										<font-awesome-icon :icon="['fa', 'caret-down']" />
									</span>
									<label for="flow">Flow:</label>
							</div> 
						</div>
					</div>
				</fieldset>
				<fieldset>
					<div class="row">
						<div class="col s12">  
							<legend class="center">
								Has a digital CV been obtained?
							</legend>
						</div>
					</div>
					<div class="row row-radio__modal center">
						<div class="col s12">
						<!-- Got CV? -->
						<div class="radio-item">
							<label for="gotCvYes">
								<div class="cv-question">
									<input
										id="gotCvYes"
										v-model="gotCv"
										type="radio"
										name="gotCv"
										class="with-gap"
										:value="true"
									/>
									<span>Yes</span>
								</div>
							</label>
						</div> 
						<div class="radio-item">
							<label for="gotCvNo" class="f-forms__radio--element">
								<input
									id="gotCvNo"
									v-model="gotCv"
									type="radio"
									name="gotCv"
									class="with-gap"
									:value="false"
								/>
								<span>No</span>
							</label>
						</div> 
						</div>
					</div>
					<div class="row">
						<div class="col s12">           
							<div v-if="gotCv" class="f-forms__uploader"> 
								<input ref="input" type="file" @change="selected" />
								<label @click="selectCv"><!-- v-if="!file && !fileError" -->
									<font-awesome-icon :icon="['fa', 'plus-circle']" /> 
									<span>
										Add your file
										<i>Up to 10mb max</i>
									</span>
								</label>
								<span v-if="fileError" class="file-error">{{ fileError }}</span>
								<span v-if="file" class="file-info">
									{{ file.name }}
									<span class="small">
										(
										<PrettySize :size="file.size" />
										)
									</span>
									<input type="reset" />
								</span> 
							</div>
						</div>
					</div>
				</fieldset>
				<div class="row">
					<div class="col s12 center">     
						<input
							type="submit"
							:value="submitButtonText"
							class="button button--dark"
							:disabled="gotCv && !file"
						/>
						<br/>
						<!-- <a href="#">Cancel &amp; clear form</a>	 -->
					</div>
				</div>
			</form>

			<br />
			<br />
			<pre v-if="error" class="error">{{ error }}</pre>
			<pre v-if="success" class="success">{{ success }}</pre>
		</div>
		 
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Branch } from '~/types';
import HeaderNav from '~/components/nav/HeaderNav.vue';
import PrettySize from '~/components/consultant/elements/PrettySize.vue';

@Component({
	middleware: 'consultant/authenticated',
	components: { HeaderNav, PrettySize },
})
export default class ConsultantRegistrationNew extends Vue {
	private apiData: Branch.Api | null = null;
	private selectedBranchId: string | number = '';
	private selectedRegistrationId: string = '';
	private error: string | null = null;
	private success: string | null = null;
	private isSaving: boolean = false;

	private firstName?: string = '';
	private lastName?: string = '';
	private email?: string = '';
	private phone?: string = '';
	private dob?: string = '';
	private gotCv: boolean = false;

	private file: File | null = null;
	private fileBlob: string | null = null;
	private fileError: string | null = null;

	private async mounted(){
		
		const consultantId = this.$store.state.consultant.auth.id;
		try {
			const response = await this.$axios.get(
				`${process.env.apiUrl}API/v1/RegistrationOptions/${consultantId}`
			);
			
			this.apiData = response.data;
		} catch (error) {
			throw new Error(error);
		}
	} 

	private get selectedBranchData() {
		if (this.apiData) {
			return this.apiData.branches.find(
				(branch: Branch.Single) => branch.id === this.selectedBranchId
			);
		} else {
			return false;
		}
	}

	private get activeFlows() {
		if (this.selectedBranchData) {
			return this.selectedBranchData.registrationFlows;
		} else {
			return [];
		}
	}

	private get submitButtonText(): string {
		return this.isSaving ? 'Registering...' : 'Register and Send Invitation';
	}

	private get consultantId(): string {
		return this.$store.state.consultant.auth.id;
	}

	private get formDataToSubmit() {
		const formData = new FormData();

		if (this.firstName) formData.set('FirstName', this.firstName);
		if (this.lastName) formData.set('LastName', this.lastName);
		if (this.email) formData.set('Email', this.email);
		if (this.phone) formData.set('Phone', this.phone);
		if (this.dob) formData.set('Dob', this.dob);
		if (this.selectedBranchId) {
			formData.set('BranchId', String(this.selectedBranchId));
		}
		if (this.selectedRegistrationId) {
			formData.set('RegistrationFlowId', this.selectedRegistrationId);
		}

		// if (this.file) {
		//   // todo: what should file be called?
		//   formData.append('cv', this.file);
		// }

		// todo: what should file be called?
		if (this.fileBlob) formData.set('cv', this.fileBlob);

		return formData;
	}

	private fakeSubmit() {
		this.isSaving = true;

		setTimeout(() => {
			this.isSaving = false;
		}, Math.random() * 1000 + 500);
	}

	private async saveValue() {
	// private saveValue() {
		this.error = null;
		this.success = null;
		this.isSaving = true; 
		// const response = null;
		this.$emit('formSuccess');
 

		try {
			const response = await this.$axios({
				method: 'post',
				url: `${process.env.apiUrl}API/v1/RegistrationSend/${this.consultantId}`,
				data: this.formDataToSubmit,
				headers: { 'Content-Type': 'multipart/form-data' },
			});

			this.isSaving = false;

			if (response.data.error) {
				this.error = response.data.error;
			} else if (response.data === 'Failed') {
				this.error = response.data;
			} else {
				this.success = 'Success'; 
				this.lastSavedValue = this.valueToSubmit;
			}

		} catch (error) {
			this.isSaving = false;
			this.error = error;
		}
	}

	// --------------------------------------------------------------------------
	// upload
	// --------------------------------------------------------------------------

	private selectCv(): void {
		const input = this.$refs.input as HTMLInputElement;
		input.click();

	}

	private selected(): void {
		const input = this.$refs.input as HTMLInputElement;
		const file: File = input.files![0];

		// check file size (Mbs)
		if (file.size > 1024 * 1024 * 10) {
			this.file = null;
			this.fileError = 'The file is too big. Select a new one.';
			return;
		}

		// read blob
		const reader: FileReader = new FileReader();
		reader.onloadend = (e: Event) => {
			const target: any = e.target;
			if (target) this.fileBlob = target.result;
		};
		reader.readAsDataURL(file);

		// add to form data
		this.file = file;
	}
}
 
</script>

<style lang="scss">

@import '~assets/sass/forms/consultant/base';

.error {
	background-color: rgba(red, 0.2);
}

.success {
	background-color: rgba(green, 0.2);
}

.f-forms {
	
	.f-forms__uploader {
		text-align: center;
		position: relative;
		background: #f5f5f5;
		padding: 3rem; 
		@include transition(all .2s);

		label {
			@include font-size(20px);
			font-weight: bold;
			opacity: 0.6;
			cursor: pointer;
			display: flex;
			flex-flow: wrap;
			justify-content: center;

			span { 
				margin-left: 10px;
			}

			svg {
				pointer-events: all;
				cursor: pointer;
			}
			
			i {
				font-style: normal;
				@include font-size(16px);
				color: $p-grey-thunder;
				display: block;
				font-weight: normal;
			}
		}

		span.file-error {
			color: #ff0068;
		}
		
	}

	.file-info {
		opacity: 0.6;
		border-radius: 18px;
		background-color: #ffffff; 
		@include font-size(16px);
		color: $p-grey-thunder;
		font-weight: normal;
		display: inline-block;
		padding: 5px 20px;
		margin-top: 30px;
		page-break-after: always; /* CSS 2.1 syntax */
		break-after: always; /* New syntax */
	}

}

.modal-container {
	h1 {
		margin: 20px;
		font-size: 36px;
		font-family: 'sofia-pro';
		font-weight: normal;
		text-align: center;
	}
}


</style>
