<template>
  <q-page class="q-ma-md">
    
    <span class="text-h3">Forms</span>
    <q-separator spaced />
    
    <div class="row justify-center">

        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-xs col-xs-12 col-sm-12 col-md-6 q-pt-xl"
        >
          <q-input
            filled
            v-model="userForm.email"
            label="Email"
            type="email"
            lazy-rules
            :rules="[ 
              val => val && val.length > 0 || 'This field is required',
              isValidEmail
            ]"
          />

          <q-input
            filled
            type="password"
            v-model="userForm.password1"
            label="Password"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'This field is required']"
          />

          <q-input
            filled
            type="password"
            v-model="userForm.password2"
            label="Confirm password"
            lazy-rules
            :rules="[ 
              val => val && val.length > 0 || 'This field is required',
              isSamePassword
            ]"
          />

          <q-checkbox 
            v-model="userForm.conditions"
            label="I accept the conditions and terms of use" 
            :style="userForm.errorInConditions 
                    && !userForm.conditions
                    && 'color: red'"
          />

          

          <div class="row justify-end">
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            <q-btn unelevated label="Submit" type="submit" color="primary"/>
          </div>
        </q-form>
    </div>



  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'FormsPage',
  setup() {
    const $q = useQuasar()

    // To add the icon you want to any field. Configured globally using the icons from line-awesome in the quasar.config.js file
    // $q.iconSet.field.error = "las la-exclamation-triangle";

    const userForm = ref({
      email: '',
      password1: '',
      password2: '',
      conditions: false,
      errorInConditions: false
    })
    return {
      userForm,
      onSubmit() {
        userForm.value.errorInConditions = false
        if ( !userForm.value.conditions ) {
          $q.notify({
            message: 'You must accept the conditions',
            icon: 'las la-exclamation-circle'
          })
          userForm.value.errorInConditions = true
          return
        }
        console.log(userForm.value)
      },
      onReset() {
        userForm.value = {
          email: '',
          password1: '',
          password2: '',
          conditions: false,
          errorInConditions: false
        }
      },
      isValidEmail( val ) {
          const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
          return emailPattern.test(val) || 'The email is not a valid email';
      },
      isSamePassword( val ) {
        return ( val === userForm.value.password1 ) || 'The passwords are not equal' 
      }
    }
  }
})
</script>