<template>
  <div id="500">
    <a-card :bordered="false" style="margin-bottom: 10px;margin-right:10px;margin-left:10px;">
      <a-result
        status="500"
        title="500"
        sub-title="Sorry, the server is wrong."
      >
        <template #extra>
          <a-button type="primary"> Back Home </a-button>
        </template>
      </a-result>
    </a-card>
  </div>
</template>